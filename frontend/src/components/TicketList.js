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

const truncate = (str, num) => {
  if (str.length <= num) return str;
  return str.slice(0, num) + "...";
};


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
    <Box sx={{ maxWidth: '90vw', margin: 'auto', mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Your support requests</Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <Table aria-label="ticket table" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ '& .MuiTableCell-head': { fontWeight: 'bold', borderBottom: '2px solid #000' } }}>
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
                sx={{ 
                  cursor: 'pointer',
                  '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {ticket.id}
                </TableCell>
                <TableCell align="right">{ticket.name}</TableCell>
                <TableCell align="right">{ticket.email}</TableCell>
                <TableCell align="right">{ticket.category}</TableCell>
                <TableCell align="right">
                  <Tooltip title={ticket.description} placement="top">
                    <Typography>{truncate(ticket.description, 20)}</Typography>
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
