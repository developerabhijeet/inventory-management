import { Product } from "./product.types";
export interface EditModalProps {
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
  handleEdit: (id: number, updatedProduct: Partial<Product>) => void;
  selectedProduct: Product;
}
