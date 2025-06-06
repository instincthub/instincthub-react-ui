// Define the shape of each category item
type Category = {
  id: string;
  title: string;
  status: boolean;
};

// Define the shape of the final object where keys are strings (the ids)
type CategoriesObject = {
  [key: string]: Category;
};

/**
 * Converts an array of category objects into an object
 * where each key is the `id` of the category.
 * @example
 * ```ts
 * const categories = [
 *   { id: "1", title: "Category 1", status: true },
 *   { id: "2", title: "Category 2", status: false },
 * ];
 * const categoriesObject = convertArrayToObject(categories);
 * console.log(categoriesObject);
 * // Output:
 * {
 *   "1": { id: "1", title: "Category 1", status: true },
 *   "2": { id: "2", title: "Category 2", status: false },
 * }
 * ```
 * @param arr - Array of Category items
 * @returns An object with category ids as keys and category objects as values
 */
export default function convertArrayToObject(
  arr: Category[]
): CategoriesObject {
  return arr.reduce((acc: CategoriesObject, item: Category) => {
    acc[item.id] = item; // Use the item's id as the key
    return acc;
  }, {}); // Start with an empty object
}
