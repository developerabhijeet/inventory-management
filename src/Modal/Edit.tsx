import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { EditModalProps } from "../types/modal.types";

/**
 * EditModal component
 * @param {EditModalProps} props - The props passed from the parent component
 * @returns {React.ReactElement} The EditModal component
 */
const EditModal = ({
  isEdit,
  setIsEdit,
  handleEdit,
  selectedProduct,
}: EditModalProps) => {
  const [modifiedProduct, setProduct] = useState(selectedProduct);

  useEffect(() => {
    /**
     * Reset the state of modifiedProduct when selectedProduct changes
     * @param {Product} selectedProduct - The selected product
     */
    setProduct(selectedProduct);
  }, [selectedProduct]);

  return (
    <div>
      <Transition show={isEdit} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 flex items-center justify-center"
          onClose={() => setIsEdit(false)}
        >
          {/* Modal Background */}
          <div className="fixed inset-0 bg-black bg-opacity-50" />

          {/* Modal Content */}
          <Dialog.Panel className="relative bg-gray-800 text-white rounded-lg shadow-xl max-w-md w-full p-6 z-20">
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-xl font-bold">
                Edit Product
              </Dialog.Title>
              <button
                className="text-gray-400 hover:text-gray-200"
                onClick={() => setIsEdit(false)}
              >
                ✖️
              </button>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              {selectedProduct?.name || "No Product Selected"}
            </p>

            {/* Form */}
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleEdit(selectedProduct.id, modifiedProduct);
                setIsEdit(false);
              }}
            >
              {/* Category and Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Category</label>
                  <input
                    type="text"
                    value={modifiedProduct.category || ""}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg text-gray-300 focus:ring-2 focus:ring-lime-500 focus:outline-none"
                    onChange={(e) =>
                      setProduct({
                        ...modifiedProduct,
                        category: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Price</label>
                  <input
                    type="number"
                    value={modifiedProduct.price || 0}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg text-gray-300 focus:ring-2 focus:ring-lime-500 focus:outline-none"
                    onChange={(e) =>
                      setProduct({
                        ...modifiedProduct,
                        price: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              {/* Quantity and Value */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Quantity</label>
                  <input
                    type="number"
                    value={modifiedProduct.quantity || 0}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg text-gray-300 focus:ring-2 focus:ring-lime-500 focus:outline-none"
                    onChange={(e) =>
                      setProduct({
                        ...modifiedProduct,
                        quantity: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Value</label>
                  <input
                    type="number"
                    value={
                      modifiedProduct.price * modifiedProduct.quantity || 0
                    }
                    disabled
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg text-gray-300 focus:ring-2 focus:ring-lime-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-400 hover:text-gray-300"
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-lime-500 text-gray-900 rounded-lg hover:bg-lime-600"
                >
                  Save
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </div>
  );
};

export default EditModal;
