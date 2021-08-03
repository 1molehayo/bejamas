import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { fetchProducts } from "../apis";
import { useAppContext } from "../contexts/appContext";
import { ImagePropModel } from "../models/image";
import ProductModel from "../models/product";
import { formatPrice, getOptimizedImage } from "../utility";
import { Button } from "./button";
import { Pagination } from "./pagination";

interface IProducts {
  products: ProductModel[];
  setProducts: Dispatch<SetStateAction<any>>;
}

const Products = ({ products, setProducts }: IProducts) => {
  const { isMobile, isTab, lastDoc, firstDoc } = useAppContext();

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
    try {
      const doc =
        direction === "next" ? JSON.parse(lastDoc) : JSON.parse(firstDoc);
      const res = await fetchProducts(direction, doc);
      console.log(res.products);
      setProducts(res.products);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="products">
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

                  <Button text="add to cart" className="w-100" />
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
