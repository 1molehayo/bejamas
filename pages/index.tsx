import Head from "next/head";
import Error from "next/error";
import React, { useState } from "react";
import { fetchCategories, fetchProducts } from "./api";
import { Filter, SortProducts } from "../components";
import Hero from "../components/hero";
import Products from "../components/products";
import { useAppContext } from "../contexts/appContext";
import ProductModel from "../models/product";
import { removeCategoryDuplicates } from "../utility";

export const getStaticProps = async () => {
  try {
    const { products, lastDoc, firstDoc } = await fetchProducts("next", 0);
    const { categories, featured, pageSize } = await fetchCategories();

    return {
      props: {
        products,
        categories,
        featured,
        pageSize,
        lastDoc,
        firstDoc,
      },
    };
  } catch (error) {
    return {
      props: {
        errorCode: 500,
        products: [],
        categories: [],
        featured: null,
      },
    };
  }
};

interface IProps {
  errorCode: number;
  status: boolean;
  products: ProductModel[];
  categories: string[];
  featured: ProductModel;
  pageSize: number;
  lastDoc: any;
  firstDoc: any;
}

export default function Home({
  errorCode,
  products,
  categories,
  featured,
  pageSize,
  lastDoc,
  firstDoc,
}: IProps) {
  const { updateFirstDoc, updateLastDoc, updateProducts, updatePageSize } =
    useAppContext();

  React.useEffect(() => {
    if (firstDoc) {
      updateFirstDoc(firstDoc);
    }

    if (lastDoc) {
      updateLastDoc(lastDoc);
    }

    if (products) {
      updateProducts(products);
    }

    if (pageSize) {
      updatePageSize(pageSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstDoc, lastDoc, products, pageSize]);

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

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

            <SortProducts />
          </div>

          <div className="home__products">
            <Filter productCategories={removeCategoryDuplicates(categories)} />
            <Products />
          </div>
        </div>
      </section>
    </div>
  );
}
