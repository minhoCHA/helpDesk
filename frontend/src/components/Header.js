import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

// The Header functional component renders the navigation bar at the top of the page.
function Header() {
  return (
    // AppBar from Material-UI acts as a navigation header
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ background: "#fff" }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          sx={{ flexGrow: 1, textDecoration: "none" }}
          component={RouterLink}
          to="/"
        >
          ZEALTHY Help Desk
        </Typography>
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
          component={RouterLink}
          to="/admin"
        >
          Admin
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
