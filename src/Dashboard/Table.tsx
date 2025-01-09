import React from 'react'
import { FaEye, FaTrash, FaEdit } from "react-icons/fa";
interface TableProps {
  columns: string[];
  products: any[];
  isAdmin: boolean;
}
const Table = ({ columns, products, isAdmin }: TableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-gray-800 rounded-lg">
        <thead>
          <tr className="bg-gray-700">
            {columns.map((column: string) => <th className="px-6 py-4 text-center">
              <span className="bg-gray-900 text-lime-400 px-3 py-1 rounded-full font-bold uppercase text-sm">{column}</span>
            </th>)}

          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className={`${product.isDisabled ? 'bg-gray-700' : ''} hover:bg-gray-700 transition`}>
              <td className="px-6 py-4">{product.name}</td>
              <td className="px-6 py-4">{product.category}</td>
              <td className="px-6 py-4">${product.price}</td>
              <td className="px-6 py-4">{product.quantity}</td>
              <td className="px-6 py-4">${product.price * product.quantity}</td>
              <td className="px-6 py-4">
                <div className='pl-10'>
                  {isAdmin ? (
                    <div className="flex space-x-2">
                      <button className="text-green-500 hover:underline"><FaEdit /></button>
                      <button className="text-purple-500 hover:underline"><FaEye /></button>
                      <button className="text-red-500 hover:underline"><FaTrash /></button>
                    </div>
                  ) : (
                    <div className="text-gray-500">No Actions</div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
