import Head from "next/head";
import React, { useState } from "react";
import { fetchCategories, fetchProducts } from "../apis";
import { Filter, SortProducts } from "../components";
import Hero from "../components/hero";
import Products from "../components/products";
import { useAppContext } from "../contexts/appContext";
import ProductModel from "../models/product";
import { removeCategoryDuplicates } from "../utility";

export const getStaticProps = async () => {
  try {
    const { products, lastDoc, firstDoc } = await fetchProducts("next", 0);
    const { categories, featured } = await fetchCategories();

    return {
      props: {
        products,
        categories,
        featured,
        lastDoc,
        firstDoc,
      },
    };
  } catch (error) {
    return {
      props: {
        error: JSON.stringify(error) || "Error loading products",
        products: [],
        categories: [],
        featured: null,
      },
    };
  }
};

interface IProps {
  error: Error;
  status: boolean;
  products: ProductModel[];
  categories: string[];
  featured: ProductModel;
  lastDoc: any;
  firstDoc: any;
}

export default function Home({
  error,
  products,
  categories,
  featured,
  lastDoc,
  firstDoc,
}: IProps) {
  const [productsData, setProducts] = useState<ProductModel[]>(products);
  const { updateFirstDoc, updateLastDoc } = useAppContext();

  React.useEffect(() => {
    if (firstDoc || lastDoc) {
      updateFirstDoc(firstDoc);
      updateLastDoc(lastDoc);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstDoc, lastDoc]);

  return (
    <div className="home">
      <Head>
        <title>Home | Bejamas</title>
        <meta name="description" content="Bejamas art ecommerce" />
      </Head>

      {featured && <Hero featured={featured} />}

      <section className="section">
        <div className="container">
          <div className="products__header">
            <div>
              <h1>
                Photography /{" "}
                <span className="font-regular color-grey-shade4">
                  Premium Photos
                </span>
              </h1>
            </div>

            <SortProducts setProducts={setProducts} />
          </div>

          <div className="home__products">
            <Filter categories={removeCategoryDuplicates(categories)} />
            <Products products={productsData} setProducts={setProducts} />
          </div>
        </div>
      </section>
    </div>
  );
}
