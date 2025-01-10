import React, { useState } from "react";
import { FaEye, FaTrash, FaEdit, FaEyeSlash } from "react-icons/fa";
import { TableProps } from "../types/table.types";
import EditModal from "../Modal/Edit";
import { Product } from "../types/product.types";
import { parseCurrency } from "../utils/transform";

/**
 * Table component to display a list of products.
 * @param {TableProps} props Props passed to the component.
 * @returns {JSX.Element} JSX element of the component.
 */
const Table = ({
  columns,
  products,
  isAdmin,
  handleDelete,
  handleDisable,
  handleEdit,
}: TableProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>({
    id: 0,
    name: "No Product Selected",
    price: 0,
    quantity: 0,
    category: "",
    isDisabled: false,
  });

  /**
   * Handles the edit button click event.
   * @param {Product} product The product to be edited.
   */
  const handleEditProduct = (product: Product) => {
    setIsEdit(true);
    setSelectedProduct(product);
  };

  return (
    <>
      <div className="overflow-x-auto">
        {/* The table component. */}
        <table className="w-full border-collapse bg-gray-800 rounded-lg">
          <thead>
            {/* Table header. */}
            <tr className="bg-gray-700">
              {columns.map((column: string, index: number) => (
                <th className="px-6 py-4 text-center" key={index}>
                  {/* Table header cell. */}
                  <span className="bg-gray-900 text-lime-400 px-3 py-1 rounded-full font-bold uppercase text-sm">
                    {column}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Table body. */}
            {products.map((product) => (
              <tr
                key={product.id}
                className={`${
                  product.isDisabled ? "bg-gray-700" : ""
                } hover:bg-gray-700 transition`}
              >
                {/* Table body cell. */}
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">{product.quantity}</td>
                <td className="px-6 py-4">
                  ${parseCurrency(product.price) * product.quantity}
                </td>
                <td className="px-6 py-4">
                  {/* Action buttons. */}
                  <div className="pl-10">
                    <div className="flex space-x-2">
                      {/* Edit button. */}
                      <button
                        disabled={!isAdmin || product.isDisabled}
                        className={`${
                          !isAdmin || product.isDisabled
                            ? "text-gray-500"
                            : "text-green-500 hover:underline"
                        }`}
                        onClick={() => handleEditProduct(product)}
                      >
                        <FaEdit />
                      </button>

                      {/* Disable button. */}
                      <button
                        disabled={!isAdmin}
                        className={`${
                          !isAdmin
                            ? "text-gray-500"
                            : "text-purple-500 hover:underline"
                        }`}
                        onClick={() => handleDisable(product.id)}
                      >
                        {product.isDisabled || !isAdmin ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )}
                      </button>

                      {/* Delete button. */}
                      <button
                        disabled={!isAdmin}
                        className={`${
                          !isAdmin
                            ? "text-gray-500"
                            : "text-red-500 hover:underline"
                        }`}
                        onClick={() => handleDelete(product.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Edit modal. */}
      <EditModal
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        handleEdit={handleEdit}
        selectedProduct={selectedProduct}
      />
    </>
  );
};

export default Table;
