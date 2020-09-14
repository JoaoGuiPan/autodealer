
export const getMatTableFilterValue = (filters, field) => {
  const filter = filters.find(f => f.column.field === field);
  return filter && filter.value
};
