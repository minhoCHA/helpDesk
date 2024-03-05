import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const categories = [
  "Weight Loss",
  "Primary Care",
  "Mental Health",
  "Erectile Dysfunction",
  "Urgent Care",
  "Hair Loss",
  "Birth Control",
];

function LandingPage() {
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    // You might want to do something with the selected category before redirecting
    navigate("/form", { state: { category } });
  };

  return (
    <div>
      <Box></Box>
      <Box sx={{ flexGrow: 1, textAlign: "center", mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Contact Zealthy Support
        </Typography>
        <Grid container sx={{ mt: 8 }} spacing={2} justifyContent="center">
          {categories.map((category) => (
            <Grid item key={category}>
              <Button
                variant="contained"
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default LandingPage;
