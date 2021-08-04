import Image from "next/image";
import { Button } from "./button";
import { useAppContext } from "../contexts/appContext";
import { formatBytes, formatCharLength, getOptimizedImage } from "../utility";
import ProductModel from "../models/product";
import { ImagePropModel } from "../models/image";

interface IProps {
  featured: ProductModel;
}

const Hero = ({ featured }: IProps) => {
  const { isMobile, isTab, addToCart } = useAppContext();

  const AddToCartButton = () => (
    <Button
      text="add to cart"
      onClick={() => addToCart(featured)}
      className={isMobile ? "w-100 mt-5" : ""}
    />
  );

  const getImageProps = (): ImagePropModel => {
    if (isMobile) {
      return { w: 768 };
    }

    if (isTab) {
      return { w: 990 };
    }

    return { w: 1250 };
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="section">
          <div className="hero__header">
            <h1 className="mb-0">{featured.name}</h1>

            {!isMobile && AddToCartButton()}
          </div>
          <div className="hero__image">
            <Image
              src={getOptimizedImage(featured.image.src, getImageProps())}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt={featured.image.alt}
            />

            <div className="hero__badge">
              <p>Photo of the day</p>
            </div>
          </div>
          {isMobile && AddToCartButton()}
          <div className="hero__content">
            <div className="row">
              <div className="col-lg-7">
                <h4>About {featured.name}</h4>

                {!isTab && (
                  <h5 className="color-grey-shade1">{featured.category}</h5>
                )}

                {featured.details?.description && (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: isMobile
                        ? formatCharLength(featured.details?.description, 300)
                        : featured.details?.description,
                    }}
                  />
                )}
              </div>
              <div className="col-lg-5">
                <h4 className="thumbnail-heading">People also buy</h4>

                <div className="thumbnail-wrapper">
                  {featured.details?.recommendations.map((item, i) => (
                    <div className="hero__thumbnail" key={i}>
                      <Image
                        src={item.src}
                        layout="fill"
                        objectFit="cover"
                        alt={item.alt}
                      />
                    </div>
                  ))}
                </div>

                <div className="buy-details">
                  <h5>Details</h5>
                  <p>
                    Size:{" "}
                    {`${featured.details?.dimensions.width} x ${featured.details?.dimensions.height} `}
                    pixel
                  </p>
                  <p>Size: {formatBytes(featured.details?.size)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="divider" />
      </div>
    </section>
  );
};

export default Hero;
