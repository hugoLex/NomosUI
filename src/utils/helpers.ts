export const flattenFilters = (
  filters: { header: string; options: string[] }[]
) => {
  let store: string[] = [];

  for (const group of filters) {
    for (const option of group.options) {
      !store.includes(option) && store.push(option);
    }
  }

  return store;
};
