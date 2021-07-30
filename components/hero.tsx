import heroPic from "../assets/images/hero.png";
import buyOne from "../assets/images/buy1.png";
import buyTwo from "../assets/images/buy2.png";
import buyThree from "../assets/images/buy3.png";
import Image from "next/image";
import { Button } from "./button";
import { useAppContext } from "../contexts/appContext";
import { formatCharLength } from "../utility";

const Hero = () => {
  const { isMobile, isTab } = useAppContext();

  const AddToCartButton = () => (
    <Button text="add to cart" className={isMobile ? "w-100 mt-5" : ""} />
  );

  const description = `So how did the classical Latin become so incoherent? According
                  to McClintock, a 15th century typesetter likely scrambled part
                  of Cicero&apos;s De Finibus in order to provide placeholder
                  text to mockup various fonts for a type specimen book.So how
                  did the classical Latin become so incoherent? According to
                  McClintock, a 15th century typesetter likely scrambled part of
                  Cicero&apos;s De Finibus in order to provide placeholder
                  <br />
                  <br />
                  text to mockup various fonts for a type specimen book.So how
                  did the classical Latin become so incoherent? According to
                  McClintock.`;

  return (
    <section className="hero">
      <div className="container">
        <div className="section">
          <div className="hero__header">
            <h1 className="mb-0">Samurai King Resting</h1>

            {!isMobile && AddToCartButton()}
          </div>
          <div className="hero__image">
            <Image
              src={heroPic}
              layout="fill"
              objectFit="cover"
              alt="hero"
              placeholder="blur"
            />

            <div className="hero__badge">
              <p>Photo of the day</p>
            </div>
          </div>
          {isMobile && AddToCartButton()}
          <div className="hero__content">
            <div className="row">
              <div className="col-lg-7">
                <h4>About the Samurai King Resting</h4>

                {!isTab && <h5 className="color-grey-shade1">Pets</h5>}

                <p
                  dangerouslySetInnerHTML={{
                    __html: isMobile
                      ? formatCharLength(description, 300)
                      : description,
                  }}
                />
              </div>
              <div className="col-lg-5">
                <h4 className="thumbnail-heading">People also buy</h4>

                <div className="thumbnail-wrapper">
                  <div className="hero__thumbnail">
                    <Image
                      src={buyOne}
                      layout="fill"
                      objectFit="cover"
                      alt="product thumbnail"
                      placeholder="blur"
                    />
                  </div>

                  <div className="hero__thumbnail">
                    <Image
                      src={buyTwo}
                      layout="fill"
                      objectFit="cover"
                      alt="product thumbnail"
                      placeholder="blur"
                    />
                  </div>

                  <div className="hero__thumbnail">
                    <Image
                      src={buyThree}
                      layout="fill"
                      objectFit="cover"
                      alt="product thumbnail"
                      placeholder="blur"
                    />
                  </div>
                </div>

                <div className="buy-details">
                  <h5>Details</h5>
                  <p>Size: 1020 x 1020 pixel</p>
                  <p>Size: 15 mb</p>
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
