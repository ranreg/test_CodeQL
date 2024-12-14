const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');

// API Base URL (replace with the actual URL of your backend API)
const API_BASE_URL = 'http://localhost:4000';

// Routes
app.get('/', (req, res) => {
  res.render('index', { greeting: null, error: null });
});

app.post('/get-user', async (req, res) => {
  const userId = req.query.userId;

  try {
    // Call the `get_user` API
    const response = await axios.get(`${API_BASE_URL}/get_user`, {
      params: { userId },
    });

    const user = response.data;

    // Construct the greeting message
    const fullName =
      user.full_name || `${user.first_name || ''} ${user.last_name || ''}`.trim();

    const greeting = `Hello, ${fullName}`;

    // Render the greeting
    res.render('index', { greeting, error: null });
  } catch (error) {
    console.error(error.message);

    // Handle API errors gracefully
    res.render('index', {
      greeting: null,
      error: error.response?.data?.message || 'User not found!',
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
