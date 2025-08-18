import { FilterOption } from "@app/types";

export const flattenFilters = (filters: FilterOption[]) => {
  let store: string[] = [];

  for (const group of filters) {
    for (const option of group.options) {
      !store.includes(option) && store.push(option);
    }
  }

  return store;
};

// This function builds a URL query string from an object of filters
// It filters out any keys with null, undefined, or empty string values
// It returns a string that can be appended to a URL
// Example usage:
// const filters = { court_id: 1, start_year: 2020, end_year: null, legal_area: "criminal" };
// const queryString = urlBuilder(filters); // queryString will be "court_id=1&start_year=2020&legal_area=criminal"
// If no valid filters are present, it returns an empty string

/* * 
  * @param {Record<string, string | number | null | undefined>} filters - An object containing filter key-value pairs.
  * @returns {string} - A URL query string with valid filters.
  * If no valid filters are present, it returns an empty string.
  */
export function urlFilterAndBuilder(filters: Record<string, string | number | null | undefined>): string {

  const compiledQuery = Object.entries(filters)
    .filter(
      ([key, value]) => value !== null && value !== undefined && value !== ""
    )
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return compiledQuery ? compiledQuery : "";
}