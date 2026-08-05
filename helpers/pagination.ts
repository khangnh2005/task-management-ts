

type PaginationObject = {
  currentPage: number;
  limitItems: number;
  totalPage?: number;
  skip?: number;
};

const paginationHelpers = (
  objectPagination: PaginationObject,
  query: Record<string, any>,
  countRecords: number
): PaginationObject => {
  const pageValue: unknown = query.page;
  if (typeof pageValue === 'string' && pageValue.length > 0) {
    objectPagination.currentPage = parseInt(pageValue, 10);
  }

  const limitValue: unknown = query.limit;
  if (typeof limitValue === 'string' && limitValue.length > 0) {
    objectPagination.limitItems = parseInt(limitValue, 10);
  }

  const totalPage: number = Math.ceil(countRecords / objectPagination.limitItems);

  objectPagination.totalPage = totalPage;
  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;

  return objectPagination;
}
export default paginationHelpers