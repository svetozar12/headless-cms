export const withPagination = (
  page: number,
  pageSize: number
): { skip: number; take: number } => {
  return { skip: page === 1 ? 0 : page - 1 * pageSize, take: pageSize };
};
