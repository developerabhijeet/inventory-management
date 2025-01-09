import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Table from './Table';
import Widgets from './Widgets';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  isDisabled: boolean;
}
const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Bluetooth Headset",
    category: "Electronics",
    price: 25,
    quantity: 5,
    isDisabled: false,
  },
  {
    id: 2,
    name: "Edifier M34560 Speaker",
    category: "Electronics",
    price: 35,
    quantity: 0,
    isDisabled: false,
  },
  {
    id: 3,
    name: "Sony 4K 55-inch Ultra TV",
    category: "Electronics",
    price: 800,
    quantity: 2,
    isDisabled: false,
  },
  {
    id: 4,
    name: "Samsung 55-inch TV",
    category: "Electronics",
    price: 500,
    quantity: 10,
    isDisabled: false,
  },
  {
    id: 5,
    name: "Samsung S24 Ultra",
    category: "Phones",
    price: 1200,
    quantity: 3,
    isDisabled: false,
  },
  {
    id: 6,
    name: "Apple iPhone 14 Pro",
    category: "Phones",
    price: 1500,
    quantity: 0,
    isDisabled: true,
  },
  {
    id: 7,
    name: "Logitech MX Master 3",
    category: "Accessories",
    price: 100,
    quantity: 20,
    isDisabled: false,
  },
  {
    id: 8,
    name: "Dell XPS 13 Laptop",
    category: "Laptops",
    price: 1200,
    quantity: 5,
    isDisabled: false,
  },
  {
    id: 9,
    name: "Apple MacBook Pro 16",
    category: "Laptops",
    price: 2500,
    quantity: 2,
    isDisabled: false,
  },
  {
    id: 10,
    name: "Sony Noise Cancelling Headphones",
    category: "Accessories",
    price: 300,
    quantity: 15,
    isDisabled: false,
  },
];



const Listing = () => {
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [isAdmin, setIsAdmin] = useState(true);

  const columns = [
    "Name", "Category", "Price", "Quantity", "value", "Actions"
  ]
  // Fetch data from the API
  // useEffect(() => {
  //   axios
  //     .get('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory')
  //     .then((response) => {
  //       setProducts(response.data);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  // Calculate statistics
  const calculateStats = () => {
    const totalProducts = products.length;
    const totalStoreValue = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
    const outOfStock = products.filter((product) => product.quantity === 0).length;
    const categories = new Set(products.map((product) => product.category)).size;

    return { totalProducts, totalStoreValue, outOfStock, categories };
  };

  const { totalProducts, totalStoreValue, outOfStock, categories } = calculateStats();

  // Handlers for admin actions
  const handleEdit = (id: number, updatedProduct: Partial<Product>) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const handleDelete = (id: number) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  const handleDisable = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, isDisabled: !product.isDisabled } : product
      )
    );
  };

  interface WidgetProps {
    title: string;
    value: number | string;
  }
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

      <Widgets widgetData={widgetData} />

      <Table columns={columns} products={products} isAdmin={isAdmin} />

    </div>
  );
}

export default Listing
