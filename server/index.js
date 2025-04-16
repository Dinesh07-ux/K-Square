const express = require('express');
const cors = require('cors');
const userController = require('./src/controllers/userController');

const app = express();
const port = process.env.PORT || 6001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/users', userController.getUsers);

// Start server
app.listen(port, () => {
  logger.debug(`Server running on port ${port}`);
}); 