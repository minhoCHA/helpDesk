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
  Box,
  Typography,
  Tooltip,
} from "@mui/material";

function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const response = await axios.get("http://localhost:3001/api/tickets");
    setTickets(response.data);
  };

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
              <TableRow key={ticket.id} hover>
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
    </Box>
  );
}

export default TicketList;
