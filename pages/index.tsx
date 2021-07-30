import Head from "next/head";
import { SortProducts } from "../components";
import Filter from "../components/filter";
import Hero from "../components/hero";
import Products from "../components/products";
// import { useAppContext } from "../contexts/appContext";
import { PRODUCTS } from "../utility/constants";

export default function Home() {
  return (
    <div className="home">
      <Head>
        <title>Home | Bejamas</title>
        <meta name="description" content="Bejamas art ecommerce" />
      </Head>

      <Hero />

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

            <SortProducts />
          </div>

          <div className="home__products">
            <Filter />
            <Products products={PRODUCTS} />
          </div>
        </div>
      </section>
    </div>
  );
}
