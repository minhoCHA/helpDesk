import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" color="inherit" component={RouterLink} to="/">
          ZEALTHY Help Desk
        </Typography>
        <Button variant="contained" component={RouterLink} to="/admin">
          Admin
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
