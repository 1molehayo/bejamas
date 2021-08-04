import Image from "next/image";
import { fetchProducts } from "../pages/api";
import { useAppContext } from "../contexts/appContext";
import { ImagePropModel } from "../models/image";
import { formatPrice, getOptimizedImage } from "../utility";
import { Button } from "./button";
import { Pagination } from "./pagination";
import { Loader } from "./loader";

const Products = () => {
  const {
    isMobile,
    isTab,
    lastDoc,
    firstDoc,
    updateFirstDoc,
    updateLastDoc,
    currentPage,
    updateCurrentPage,
    updateProducts,
    products,
    filterProps,
    sortProps,
    loading,
    toggleLoader,
    addToCart,
  } = useAppContext();

  const imageOptions = {
    fit: "crop",
  };

  const getImageProps = (): ImagePropModel => {
    if (isMobile) {
      return { ...imageOptions, h: 500, w: 350 };
    }

    if (isTab) {
      return { ...imageOptions, h: 300, w: 210 };
    }

    return { ...imageOptions, h: 400, w: 280 };
  };

  const fetchData = async (direction: "next" | "prev") => {
    toggleLoader();

    try {
      const doc = direction === "next" ? lastDoc : firstDoc;
      const res = await fetchProducts(direction, doc, filterProps, sortProps);
      updateFirstDoc(res.firstDoc);
      updateLastDoc(res.lastDoc);

      if (direction === "next") {
        updateCurrentPage(currentPage + 1);
      } else {
        const page = currentPage > 1 ? currentPage - 1 : 1;
        updateCurrentPage(page);
      }

      updateProducts(res.products);
    } catch (error) {
      console.log("error", error);
    } finally {
      toggleLoader();
    }
  };

  return (
    <div className="products">
      {loading && <Loader />}

      <div className="row pb-5">
        {products &&
          products.map((product, i) => (
            <div className="col-md-6 col-xl-4 mb-4" key={i}>
              <div className="product__card">
                <div className="product__image">
                  {product.bestseller && (
                    <div className="best-seller">Best Seller</div>
                  )}
                  <Image
                    src={getOptimizedImage(product.image.src, getImageProps())}
                    alt={product.image.alt}
                    layout="fill"
                    objectFit="cover"
                  />

                  <Button
                    text="add to cart"
                    onClick={() => addToCart(product)}
                    className="w-100"
                  />
                </div>
                <h4 title={product.category}>{product.category}</h4>
                <h1 title={product.name}>{product.name}</h1>
                <p>{formatPrice(product.currency, product.price)}</p>
              </div>
            </div>
          ))}
      </div>

      <Pagination fetchData={fetchData} />
    </div>
  );
};

export default Products;
