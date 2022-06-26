import * as React from "react";
import { Box, Link } from "@mui/material";
import Grid from "@mui/material/Grid";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

function Copyright() {
  return (
    <React.Fragment>
      {"© "}
      <Link color="inherit" href="#">
        Revapp
      </Link>{" "}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const iconStyle = {
  width: -48,
  height: -48,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  mr: 1,
  "&:hover": {
    bgcolor: "dark",
  },
};

export default function Footer() {
  return (
    <Typography component="footer" sx={{ display: "flex"}}>
      <Container color="primary" sx={{ my: 3, display: "flex", justifyContent: "center",
      alignItems: "center"}}>
        <Grid container md={12} spacing={5}>
          <Grid item xs={12} sm={12} md={6}>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              spacing={2}
              sx={{ height: 120 }}
            >
              <Grid item sx={{ display: "flex" }}>
                <Box component="a" href="#" sx={iconStyle}>
                  <FacebookIcon />
                </Box>
                <Box component="a" href="#" sx={iconStyle}>
                  <InstagramIcon />
                </Box>
                <Box component="a" href="#" sx={iconStyle}>
                  <TwitterIcon />
                </Box>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="h6" marked="left" gutterBottom>
              Legal
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: "none", p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="#">Terms</Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="#">Privacy</Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="caption" sx={{ ml: 2 }}>
              {"Icons made by "}
              <Link
                href="https://www.freepik.com"
                rel="sponsored"
                title="Freepik"
              >
                Freepik
              </Link>
              {" from "}
              <Link
                href="https://www.flaticon.com"
                rel="sponsored"
                title="Flaticon"
              >
                www.flaticon.com
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
