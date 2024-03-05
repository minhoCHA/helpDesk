import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import TicketDetails from "./TicketDetails";

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const response = await axios.get("http://localhost:3001/api/tickets");
    setTickets(response.data);
  };

  const handleOpen = (ticket) => {
    setSelectedTicket(ticket);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Typography variant="h4">Your support requests</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow
                onClick={() => handleOpen(ticket)}
                key={ticket.id}
                hover
              >
                <TableCell component="th" scope="row">
                  {ticket.id}
                </TableCell>
                <TableCell align="right">{ticket.name}</TableCell>
                <TableCell align="right">{ticket.email}</TableCell>
                <TableCell align="right">{ticket.category}</TableCell>
                <TableCell align="right">
                  <Tooltip title={ticket.description} placement="top">
                    <Typography>{(ticket.description, 20)}</Typography>
                  </Tooltip>
                </TableCell>
                <TableCell align="right">{ticket.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          {selectedTicket && (
            <TicketDetails
              ticket={selectedTicket}
              handleClose={handleClose}
              refreshTickets={fetchTickets}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default TicketList;
