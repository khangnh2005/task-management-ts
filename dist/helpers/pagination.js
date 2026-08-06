"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginationHelpers = (objectPagination, query, countRecords) => {
    const pageValue = query.page;
    if (typeof pageValue === 'string' && pageValue.length > 0) {
        objectPagination.currentPage = parseInt(pageValue, 10);
    }
    const limitValue = query.limit;
    if (typeof limitValue === 'string' && limitValue.length > 0) {
        objectPagination.limitItems = parseInt(limitValue, 10);
    }
    const totalPage = Math.ceil(countRecords / objectPagination.limitItems);
    objectPagination.totalPage = totalPage;
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
    return objectPagination;
};
exports.default = paginationHelpers;
