const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/tickets', ticketRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
