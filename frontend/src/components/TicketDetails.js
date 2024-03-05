import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

function TicketDetails({ ticket, handleClose, refreshTickets }) {
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState(ticket.status);

  const submitResponse = async () => {
    if (!response) {
      const isConfirmed = window.confirm(
        "Are you sure you want to submit it without a response?"
      );
      if (!isConfirmed) return; // If user clicks "No", then do not proceed
    }

    try {
      await axios.patch(
        `http://localhost:3001/api/tickets/${ticket.id}/status`,
        { status }
      );
      refreshTickets(); // Refresh the ticket list to show the updated status
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Failed to update ticket status:", error);
    }

    try {
      console.log(`Would normally send email here with body: '${response}'`);
      await axios.post(
        `http://localhost:3001/api/tickets/${ticket.id}/response`,
        { response }
      );
      setResponse("");
      refreshTickets(); // Refresh the ticket list to show the updated response
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Failed to submit response:", error);
    }
  };

  return (
    <Box>
      <Box>
        <Typography variant="h6" component="h2">
          Ticket Details
        </Typography>
        <IconButton onClick={handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3 }} />
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Name:</strong> {ticket.name}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Email:</strong> {ticket.email}
      </Typography>
      <Box>
        <Typography variant="body1">
          <strong>Status:</strong>
        </Typography>
        <TextField
          select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="new">New</MenuItem>
          <MenuItem value="in progress">In Progress</MenuItem>
          <MenuItem value="resolved">Resolved</MenuItem>
        </TextField>
      </Box>

      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Description:</strong>
      </Typography>
      {/* Scrollable Description */}
      <Box>
        <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
          {ticket.description}
        </Typography>
      </Box>
      <TextField
        fullWidth
        label="Response"
        multiline
        rows={4}
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        variant="outlined"
      />
      <Button variant="contained" onClick={submitResponse}>
        Submit Response
      </Button>
    </Box>
  );
}

export default TicketDetails;
