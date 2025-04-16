const userService = require('../services/userService');
const { serializeUsers } = require('../serializers/userSerializer');

const getUsers = (req, res) => {
  try {
    const { page = 1, size = 10, sort } = req.query;
    const pageNumber = parseInt(page);
    const pageSize = parseInt(size);
    
    const { users, totalResults } = userService.getUsers(pageNumber, pageSize, sort);
    const response = serializeUsers(users, pageNumber, pageSize, totalResults, req);
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getUsers
}; 