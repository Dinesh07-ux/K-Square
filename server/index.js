const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 6001;

app.use(cors());
app.use(express.json());

// Sample user data with more entries
const users = [
  { name: 'Jorn', id: 0 },
  { name: 'Markus', id: 3 },
  { name: 'Andrew', id: 2 },
  { name: 'Ori', id: 4 },
  { name: 'Mike', id: 1 },
  { name: 'Sarah', id: 5 },
  { name: 'David', id: 6 },
  { name: 'Emma', id: 7 },
  { name: 'James', id: 8 },
  { name: 'Olivia', id: 9 },
  { name: 'William', id: 10 },
  { name: 'Sophia', id: 11 },
  { name: 'Benjamin', id: 12 },
  { name: 'Isabella', id: 13 },
  { name: 'Lucas', id: 14 },
  { name: 'Mia', id: 15 },
  { name: 'Henry', id: 16 },
  { name: 'Charlotte', id: 17 },
  { name: 'Alexander', id: 18 },
  { name: 'Amelia', id: 19 },
  { name: 'Daniel', id: 20 },
  { name: 'Harper', id: 21 },
  { name: 'Michael', id: 22 },
  { name: 'Evelyn', id: 23 },
  { name: 'Matthew', id: 24 }
];

// Helper function to generate pagination links
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

// GET /api/users endpoint
app.get('/api/users', (req, res) => {
  try {
    const { page = 1, size = 10, sort } = req.query;
    const pageNumber = parseInt(page);
    const pageSize = parseInt(size);
    
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
    const totalPages = Math.ceil(totalResults / pageSize);
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    // Get paginated results
    const paginatedUsers = sortedUsers.slice(startIndex, endIndex);
    
    // Generate pagination links
    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
    const paging = {
      ...generatePaginationLinks(pageNumber, pageSize, totalPages, baseUrl),
      totalResults
    };
    
    res.json({
      users: paginatedUsers,
      paging
    });
  } catch (error) {
    console.error('Error processing users request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 