import { Product } from "./product.types";
export interface TableProps {
  columns: string[];
  products: any[];
  isAdmin: boolean;
  handleDelete: (id: number) => void;
  handleDisable: (id: number) => void;
  handleEdit: (id: number, updatedProduct: Partial<Product>) => void;
}
