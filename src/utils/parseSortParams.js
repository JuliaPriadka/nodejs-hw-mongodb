import { SORT_ORDER } from '../constants/constants.js';

function parseSortByName(unknown) {
  if (typeof unknown !== 'string') {
    return 'name';
  }

  return 'name';
}

function parseSortOrder(order) {
  if (typeof order !== 'string') {
    return SORT_ORDER.ASC;
  }
  if ([SORT_ORDER.ASC, SORT_ORDER.DESC].includes(order)) {
    return order;
  }
  return SORT_ORDER.ASC;
}

export const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;

  const parsedSortByName = parseSortByName(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);

  return {
    sortBy: parsedSortByName,
    sortOrder: parsedSortOrder,
  };
};
