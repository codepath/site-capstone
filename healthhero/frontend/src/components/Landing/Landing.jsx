import "../Landing/Landing.css";

import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Slick from "../Slick/Slick";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";
import { brown } from "@mui/material/colors";
import USC from "/Users/cfenderson/Desktop/CPLabs/site-capstone/healthhero/frontend/src/img/LicenseHeader229UofSouthernCal_2SportStyleUSC_132524476454863670.webp";

const options = [
  "University of South California",
  "Howard",
  "Washington University in St Louis",
];

const ColorButton = styled(Button)(({ theme }) => ({
  //   color: theme.palette.getContrastText(purple[500]),
  //   backgroundColor: purple[500],
  //   "&:hover": {
  //     backgroundColor: purple[700],
  //   },
  fontFamily: "Inter, Avenir, Helvetica, Arial, sans-serif",
  color: theme.palette.getContrastText(brown[500]),
  backgroundColor: brown[500],
  "&:hover": {
    backgroundColor: brown[700],
  },
  alignItems: "center",
  //doesnt change anything
}));

<>
  <link
    rel="stylesheet"
    type="text/css"
    charset="UTF-8"
    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
  />
  <link
    rel="stylesheet"
    type="text/css"
    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
  />
</>;
export default function Landing() {
  return (
    <>
      <label>
        Select your school:{" "}
        <Autocomplete
          sx={{
            display: "inline-block",
            "& input": {
              width: 200,
              height: 25,
              bgcolor: "background.paper",
              color: (theme) =>
                theme.palette.getContrastText(theme.palette.background.paper),
            },
          }}
          id="custom-input-demo"
          options={options}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <input
                type="text"
                {...params.inputProps}
                placeholder="             Search schools..."
              />
            </div>
          )}
        />
      </label>
      <Slick />

      {/* 
      swiper js for carousel? */}

      {/* // src="LicenseHeader229UofSouthernCal_2SportStyleUSC_132524476454863670.png" */}

      <Stack spacing={2} direction="row">
        <ColorButton variant="contained">
          <a href="/schools" id="link">
            See All Schools
          </a>
        </ColorButton>
      </Stack>
    </>
  );
}
