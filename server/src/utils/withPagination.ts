import logger from "./logger";

export const withPagination = (
  page: number,
  pageSize: number
): { skip: number; take: number } => {
  return { skip: (page - 1) * pageSize, take: pageSize };
};
