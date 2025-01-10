import { Product } from "../types/product.types";
/**
 * Converts a value to a number, removing any currency symbols if present.
 *
 * @param value - The value to be converted.
 *
 * @returns The converted value as a number.
 *
 * @throws TypeError if the value is not a string or number.
 */
export const parseCurrency = (
  value: string | number | null | undefined
): number => {
  if (!value) return 0;

  if (typeof value === "number") return value;

  if (typeof value === "string") {
    return parseFloat(value.replace("$", "").trim()); // Remove any currency symbols and trim whitespace
  }

  throw new TypeError("Invalid type for currency conversion");
};

/**
 * Converts the price and value of a product object to numbers.
 *
 * @param product - The product object to be converted.
 *
 * @returns The converted product object with the price and value as numbers.
 */
export const transformProductData = (product: any): Product => ({
  ...product,
  price: parseCurrency(product.price), // Convert price to number
  value: parseCurrency(product.value), // Convert value to number
});
