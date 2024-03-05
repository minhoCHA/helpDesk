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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    m: 4,
    minWidth: 300,
    maxWidth: 600, // Adjusted for better readability
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
    overflow: "hidden",
  };

  const formStyle = {
    minWidth: "200px",
    "& label.Mui-focused": {
      color: "#027c2a",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#027c2a",
        },
      },
    },
  };

  return (
    <Box sx={style}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" component="h2">
          Ticket Details
        </Typography>
        <IconButton
          onClick={handleClose}
          aria-label="close"
          sx={{
            color: "text.primary",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
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
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Typography variant="body1">
          <strong>Status:</strong>
        </Typography>
        <TextField
          sx={formStyle}
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
      <Box
        sx={{
          mb: 3,
          maxHeight: "200px",
          overflowY: "auto",
          bgcolor: "background.paper",
          p: 2,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "4px",
        }}
      >
        <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
          {ticket.description}
        </Typography>
      </Box>
      <TextField
        sx={formStyle}
        fullWidth
        label="Response"
        multiline
        rows={4}
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        variant="outlined"
      />
      <Button
        sx={{
          mt: 5,
          width: "100%",
          backgroundColor: "#00531b",
          "&:hover": {
            backgroundColor: "#027c2a",
          },
          color: "#fff",
          borderRadius: "100px",
          minWidth: "120px",
        }}
        variant="contained"
        onClick={submitResponse}
      >
        Submit Response
      </Button>
    </Box>
  );
}

export default TicketDetails;
