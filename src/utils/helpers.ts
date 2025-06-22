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
