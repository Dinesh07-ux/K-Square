const generatePaginationLinks = (page, size, totalPages, baseUrl) => {
  const links = {};
  if (page > 1) {
    links.previous = `${baseUrl}?page=${page - 1}&size=${size}`;
  }
  if (page < totalPages) {
    links.next = `${baseUrl}?page=${page + 1}&size=${size}`;
  }
  return links;
};

const serializeUsers = (users, page, size, totalResults, req) => {
  const totalPages = Math.ceil(totalResults / size);
  const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
  
  return {
    users,
    paging: {
      ...generatePaginationLinks(page, size, totalPages, baseUrl),
      totalResults
    }
  };
};

module.exports = {
  serializeUsers
}; 