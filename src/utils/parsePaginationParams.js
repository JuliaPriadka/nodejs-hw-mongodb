function parseNumber(unknown, defaultValue) {
  if (typeof unknown !== 'string') {
    return defaultValue;
  }

  const parsedNumber = parseInt(unknown);

  if (Number.isNaN(parsedNumber)) {
    return defaultValue;
  }

  return parsedNumber;
}

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
