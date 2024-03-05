import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to access the state passed by navigate()
import {
  Container,
  TextField,
  Button,
  Box,
  Snackbar,
  Typography,
} from "@mui/material";
import axios from "axios";

function TicketForm() {
  const location = useLocation(); // Get location object
  const [ticket, setTicket] = useState({
    name: "",
    email: "",
    description: "",
    category: location.state?.category || "Select a category", // Use the category passed in state, or default text
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    // If category is in the state, update it in the state of the form
    if (location.state?.category) {
      setTicket((prevTicket) => ({
        ...prevTicket,
        category: location.state.category,
      }));
    }
  }, [location.state?.category]); // Only re-run the effect if the category changes

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submissions
    if (!ticket.name || !ticket.email || !ticket.description) {
      setSnackbarMessage("All fields are required.");
      setSnackbarOpen(true);
      return;
    }
    if (!isValidEmail(ticket.email)) {
      setSnackbarMessage("Invalid email format.");
      setSnackbarOpen(true);
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:3001/api/tickets", {
        ...ticket,
        status: "new",
      });
      setSnackbarMessage("Ticket submitted successfully!");
      setTicket({ name: "", email: "", description: "" }); // Reset form
    } catch (error) {
      setSnackbarMessage("Error submitting ticket. Please try again.");
      console.error("Failed to submit ticket:", error);
    } finally {
      setIsSubmitting(false);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const style = {
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
    <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Box
        sx={{
          backgroundColor: "#fff6e9",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          "& .MuiTextField-root": { m: 1, width: "100%" },
          "& .MuiButton-root": { m: 1 },
        }}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6" sx={{ my: 2, textAlign: "center" }}>
          Category: {ticket.category}
        </Typography>
        <TextField
          sx={style}
          label="Name"
          name="name"
          value={ticket.name}
          onChange={handleChange}
          required
        />
        <TextField
          sx={style}
          label="Email"
          name="email"
          type="email"
          value={ticket.email}
          onChange={handleChange}
          required
        />
        <TextField
          sx={style}
          label="Description"
          name="description"
          multiline
          rows={4}
          value={ticket.description}
          onChange={handleChange}
          required
        />
        <Button
          sx={{
            backgroundColor: "#00531b",
            "&:hover": {
              backgroundColor: "#027c2a",
            },
            color: "#fff",
            borderRadius: "100px",
            minWidth: "120px",
          }}
          type="submit"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Ticket"}
        </Button>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </Box>
    </Container>
  );
}

export default TicketForm;
