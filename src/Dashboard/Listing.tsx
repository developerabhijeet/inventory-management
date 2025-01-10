import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Table from "./Table";
import Widgets from "./Widgets";
import { dummyProducts } from "../utils/constants";
import { WidgetProps } from "../types/widget.types";
import { Product } from "../types/product.types";
import { transformProductData } from "../utils/transform";

/**
 * The main component of the application. It fetches the data from the API,
 * calculates the statistics, and renders the UI.
 *
 * @returns {JSX.Element} The rendered UI.
 */
const Listing = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const [loading, setLoading] = useState(false);

  const columns = ["Name", "Category", "Price", "Quantity", "value", "Actions"];

  /**
   * Fetch data from the API.
   */
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory")
      .then((response) => {
        const productsWithDisable = response.data.map(
          (product: Product, index: number) => ({
            ...product,
            id: index + 1,
            isDisabled: false,
          })
        );
        const transformApiData = (products: any[]) => {
          return productsWithDisable.map((items: Product) =>
            transformProductData(items)
          );
        };

        setProducts(transformApiData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setProducts(dummyProducts);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /**
   * Calculate statistics from the products.
   *
   * @returns {Object} The calculated statistics.
   */
  const calculateStats = () => {
    const totalProducts = products.length;
    const totalStoreValue = products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    const outOfStock = products.filter(
      (product) => product.quantity === 0
    ).length;
    const categories = new Set(products.map((product) => product.category))
      .size;

    return { totalProducts, totalStoreValue, outOfStock, categories };
  };

  const { totalProducts, totalStoreValue, outOfStock, categories } =
    calculateStats();

  /**
   * Handle edit action.
   *
   * @param {number} id The ID of the product to be edited.
   * @param {Partial<Product>} updatedProduct The updated product data.
   */
  const handleEdit = (id: number, updatedProduct: Partial<Product>) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  /**
   * Handle delete action.
   *
   * @param {number} id The ID of the product to be deleted.
   */
  const handleDelete = (id: number) => {
    console.log(id);
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  /**
   * Handle disable action.
   *
   * @param {number} id The ID of the product to be disabled.
   */
  const handleDisable = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, isDisabled: !product.isDisabled }
          : product
      )
    );
  };

  const widgetData: WidgetProps[] = [
    {
      title: "Total Products",
      value: totalProducts,
    },
    {
      title: "Total Store Value",
      value: `$${totalStoreValue}`,
    },
    {
      title: "Out of Stock",
      value: outOfStock,
    },
    {
      title: "No. of Categories",
      value: categories,
    },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      {loading ? (
        <p>Please wait you beautiful, We are Fetching the data for you...</p>
      ) : (
        <>
          <Widgets widgetData={widgetData} />

          <Table
            columns={columns}
            products={products}
            isAdmin={isAdmin}
            handleDelete={handleDelete}
            handleDisable={handleDisable}
            handleEdit={handleEdit}
          />
        </>
      )}
    </div>
  );
};

export default Listing;
