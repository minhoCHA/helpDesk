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
      <Box
        sx={{
          backgroundColor: "var(--dark-cream)",
          backgroundImage:
            "linear-gradient(90deg, rgba(27, 27, 27, .55), transparent), url(https://assets-global.website-files.com/64ac3a433180d94638a63ead/64b8aac1dbf5a8888f134985_ATF-Woman-Smile-Phone.jpg)",
          backgroundSize: "auto, cover",
          backgroundPosition: "0 0, 50%",
          height: "51.5vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderBottomRightRadius: "60px",
          borderBottomLeftRadius: "60px",
        }}
      ></Box>
      <Box sx={{ flexGrow: 1, textAlign: "center", mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Contact Zealthy Support
        </Typography>
        <Grid container sx={{ mt: 8 }} spacing={2} justifyContent="center">
          {categories.map((category) => (
            <Grid item key={category}>
              <Button
                sx={{
                  backgroundColor: "#00531b",
                  "&:hover": {
                    backgroundColor: "#027c2a",
                  },
                  color: "#fff",
                  marginLeft: "10px",
                  borderRadius: "100px",
                  minWidth: "120px",
                }}
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
