import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "../Navbar/Navbar.css";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button color="inherit">
            <a className="hyperLink" href="/communites">Communities</a>
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <a className="logoPlaceHolder" href="/">Health Hero</a>
          </Typography>
          <Button color="inherit">
            <a className="hyperLink" href="/register">Sign up</a>
          </Button>
          <Button color="inherit">
            <a className="hyperLink" href="/login">Login</a>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
