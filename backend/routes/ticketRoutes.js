const express = require('express');
const router = express.Router();

// In-memory array to store tickets. In a real-world application, this would be a database.
let tickets = [];

// GET all ticket
router.get('/', (req, res) => {
    // Respond with the array of tickets in JSON format
    res.json(tickets);
});

// GET a specific ticket by ID
router.get('/:id', (req, res) => {
    // Find the ticket in the array by matching the 'id' parameter from the URL
    const ticket = tickets.find(t => t.id === parseInt(req.params.id));
    // If the ticket exists, send it back as JSON, otherwise return a 404 not found error
    ticket ? res.json(ticket) : res.status(404).send('Ticket not found');
});

// POST a new ticket
router.post('/', (req, res) => {
    // Create a new ticket object with a unique ID and the information from the request body
    const ticket = { id: tickets.length + 1, ...req.body };
    // Add the new ticket to the array
    tickets.push(ticket);
    // Respond with a 201 Created status code and the newly created ticket object
    res.status(201).send(ticket);
});

// PATCH the status of a specific ticket
router.patch('/:id/status', (req, res) => {
    // Find the index of the ticket in the array
    const index = tickets.findIndex(t => t.id === parseInt(req.params.id));
    if (index !== -1) {
        // If the ticket is found, update its status with the status from the request body
        tickets[index].status = req.body.status;
        res.send(tickets[index]);
    } else {
        res.status(404).send('Ticket not found');
    }
});

// POST a response to a specific ticket
router.post('/:id/response', (req, res) => {
    // Find the index of the ticket in the array
    const index = tickets.findIndex(t => t.id === parseInt(req.params.id));
    if (index !== -1) {
        // If the ticket is found, add the response from the request body to the ticket's 'responses' array
        tickets[index].responses = tickets[index].responses || [];
        tickets[index].responses.push(req.body.response);
        // Send back the updated ticket object
        res.send(tickets[index]);
    } else {
        // If the ticket is not found, return a 404 not found error
        res.status(404).send('Ticket not found');
    }
});

// Export the router for use in the main application file
module.exports = router;
