const users = require('../models/user');

const getUsers = (page = 1, size = 10, sort) => {
  // Create a copy of users array for sorting
  let sortedUsers = [...users];
  
  // Apply sorting if sort parameter is provided
  if (sort) {
    sortedUsers.sort((a, b) => {
      if (a[sort] < b[sort]) return -1;
      if (a[sort] > b[sort]) return 1;
      return 0;
    });
  }
  
  // Calculate pagination
  const totalResults = sortedUsers.length;
  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;
  
  // Get paginated results
  const paginatedUsers = sortedUsers.slice(startIndex, endIndex);
  
  return {
    users: paginatedUsers,
    totalResults
  };
};

module.exports = {
  getUsers
}; 