const express = require('express');
const router = express.Router();

let tickets = []; // This would be replaced by a database in a real app

router.get('/', (req, res) => {
    res.json(tickets);
});

router.get('/:id', (req, res) => {
    const ticket = tickets.find(t => t.id === parseInt(req.params.id));
    ticket ? res.json(ticket) : res.status(404).send('Ticket not found');
});

router.post('/', (req, res) => {
    const ticket = { id: tickets.length + 1, ...req.body };
    tickets.push(ticket);
    res.status(201).send(ticket);
});

router.patch('/:id/status', (req, res) => {
    const index = tickets.findIndex(t => t.id === parseInt(req.params.id));
    if (index !== -1) {
        tickets[index].status = req.body.status;
        res.send(tickets[index]);
    } else {
        res.status(404).send('Ticket not found');
    }
});

router.post('/:id/response', (req, res) => {
    const index = tickets.findIndex(t => t.id === parseInt(req.params.id));
    if (index !== -1) {
        tickets[index].responses = tickets[index].responses || [];
        tickets[index].responses.push(req.body.response);
        res.send(tickets[index]);
    } else {
        res.status(404).send('Ticket not found');
    }
});

module.exports = router;
