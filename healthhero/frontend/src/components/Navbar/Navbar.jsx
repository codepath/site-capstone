import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import "../Navbar/Navbar.css";

export default function Navbar() {
  return (
    <div>
      <p>navbar</p>
      <a href="/login" className="login">
        login
      </a>
    </div>
    //     <Box sx={{ flexGrow: 0 }}>
    //       <AppBar position="static">
    //         <Toolbar>
    //           <IconButton
    //             size="large"
    //             edge="start"
    //             color="inherit"
    //             aria-label="menu"
    //             sx={{ mr: 2 }}
    //           >
    //             <MenuIcon />
    //           </IconButton>
    //           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    //             <div className="navbar">
    //               <ul>
    //                 <div className="logo">{/* logo img goes here  */}</div>
    //                 {/* <li>
    //                   <a href="/activity">Activity</a>
    //                 </li>
    //                 <li>
    //                   <a href="/exercise">Exercise</a>
    //                 </li>
    //                 <li>
    //                   <a href="/nutrition">Nutrition</a>
    //                 </li>
    //                 <li>
    //                   <a href="/sleep">Sleep</a>
    //                 </li> */}
    //                 <li>
    //                   <a href="/community">Community</a>
    //                 </li>
    //                 <li>
    //                   <a href="/login" className="login">
    //                     Login
    //                     {/* move */}
    //                   </a>
    //                 </li>
    //               </ul>
    //             </div>
    //             {/* <ul>
    //               <li><NavLink to "/">Home</Navlink></li>
    //             </ul> */}
    //           </Typography>
    //           {/* <div><ul>
    //             <li> <NavLink to "/"> Home </NavLink></li>
    //             </ul></div> */}
    //           <Button color="inherit" className="signUp">
    //             <a href="/register"> Sign Up</a>
    //             {/* Sign Up */}
    //           </Button>
    //         </Toolbar>
    //       </AppBar>
    //     </Box>
  );
}
