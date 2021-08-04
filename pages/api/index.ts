import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";
import { PAGE_SIZE } from "../../utility/constants";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

const db = firebase.firestore();

const productsCollection = db.collection("products");

const getProductData = (
  snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
) => {
  let products: { id: string }[] = [];

  const lastDoc = snapshot.docs[snapshot.docs.length - 1];
  const firstDoc = snapshot.docs[0];

  snapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });

  return {
    products,
    lastDoc: lastDoc ? lastDoc.data() : null,
    firstDoc: firstDoc ? firstDoc.data() : null,
  };
};

export const fetchProducts = async (
  direction: "next" | "prev",
  docToUse?: any,
  filterProps?: any,
  sortProps?: string
) => {
  try {
    let snapshotQuery: any = db.collection("products");
    const doc = docToUse
      ? docToUse[sortProps === "price" ? "price" : "name"]
      : 0;

    if (filterProps) {
      const { categories, prices } = filterProps;

      if (categories && categories.length > 0) {
        snapshotQuery = snapshotQuery.where("category", "in", categories);
      }

      if (prices && prices.length > 0) {
        prices.forEach((priceStr: string) => {
          const priceArr = priceStr.split("-") || [];

          if (parseInt(priceArr[0]) !== 0) {
            snapshotQuery = snapshotQuery.where(
              "price",
              ">=",
              parseInt(priceArr[0])
            );
          }

          if (priceArr[1]) {
            snapshotQuery = snapshotQuery.where(
              "price",
              "<=",
              parseInt(priceArr[1])
            );
          }
        });
      }
    }

    if (sortProps === "asc") {
      snapshotQuery = snapshotQuery.orderBy("name", "asc");
    }

    if (sortProps === "desc") {
      snapshotQuery = snapshotQuery.orderBy("name", "desc");
    }

    if (!sortProps || sortProps === "price") {
      snapshotQuery = snapshotQuery.orderBy("price");
    }

    if (direction === "next") {
      snapshotQuery = snapshotQuery.startAfter(doc || 0).limit(PAGE_SIZE);
    } else {
      snapshotQuery = snapshotQuery.endBefore(doc || 0).limitToLast(PAGE_SIZE);
    }

    const productsDoc = await snapshotQuery.get();

    return getProductData(productsDoc);
  } catch (error) {
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const allProducts = await productsCollection.get();
    const docSize = await allProducts.size;
    const pageSize = docSize > PAGE_SIZE ? Math.ceil(docSize / PAGE_SIZE) : 1;
    const categories = await allProducts.docs.map((doc) => doc.data().category);
    const priceDoc = await productsCollection
      .orderBy("price", "desc")
      .limit(1)
      .get();
    
    let priceList = [];
    const highestPrice = priceDoc.docs.map((doc) => doc.data().price)[0];
    const res = highestPrice / 5;

    for (let i = 0; i < 4; i++) {
      if (i === 3) {
        priceList.push(`${(res * i).toFixed(2)}`);
      } else {
        priceList.push(`${(res * i).toFixed(2)}-${((res * (i + 1)) - 0.01).toFixed(2)}`);
      }
    }

    const featuredDoc = await productsCollection
      .where("featured", "==", true)
      .get();

    const featured = await featuredDoc.docs.map((doc) => doc.data())[0];

    return { categories, featured, pageSize, priceList };
  } catch (error) {
    throw error;
  }
};
