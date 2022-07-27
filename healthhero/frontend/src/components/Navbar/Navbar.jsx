import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "../Navbar/Navbar.css";
import { useAuthContext } from "../../../AuthContext/auth";
import App from "../../App";

export default function Navbar({ logoutuser }) {
  const { user, setUser } = useAuthContext();
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
          Community
          {/* make button/list item */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Logo placeholder
          </Typography>
          {user ? (
            <Button color="inherit">
              <a href="/login">Login</a>
            </Button>
          ) : (
            <Button color="inherit" onClick={logoutuser}>
              <a href="/">Logout</a>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
