import Image from "next/image";
import { useAppContext } from "../contexts/appContext";
import { ImagePropModel } from "../models/image";
import ProductModel from "../models/product";
import { formatPrice, getOptimizedImage } from "../utility";
import { Button } from "./button";

interface IProducts {
  products: ProductModel[];
}

const Products = ({ products }: IProducts) => {
  const { isMobile, isTab } = useAppContext();

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

  return (
    <div className="products">
      <div className="row">
        {products &&
          products.map((product, i) => (
            <div className="col-md-6 col-xl-4" key={i}>
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
                <h4>{product.category}</h4>
                <h1>{product.name}</h1>
                <p>{formatPrice(product.currency, product.price)}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
