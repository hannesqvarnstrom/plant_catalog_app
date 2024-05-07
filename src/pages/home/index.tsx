/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Link as MUILink,
  AppBar,
  Box,
  Container,
  createTheme,
  CssBaseline,
  IconButton,
  PaletteMode,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeSharpIcon from "@mui/icons-material/DarkModeSharp";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Home: React.FC = () => {
  const [mode, setMode] = React.useState<PaletteMode>("dark");
  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };
  const defaultTheme = createTheme({ palette: { mode } });

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ boxShadow: 0, bgcolor: "transparent" }}>
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={
              (/*_theme*/) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
                borderRadius: "999px",
                backdropFilter: "blur(24px)",
                maxHeight: 40,
                border: "1px solid",
                borderColor: "divider",
                //theme.palette.mode === 'light'
                boxShadow:
                  //</Container>? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)` :
                  "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
                //             bgcolor:
                // theme.palette.mode === 'light'
                //   ? 'rgba(255, 255, 255, 0.4)'
                //   : 'rgba(0, 0, 0, 0.4)',
              })
            }
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            ></Box>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              PotExpert
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="darkmode"
              sx={{ mr: 2 }}
              onClick={toggleColorMode}
            >
              <DarkModeSharpIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <ul>
        <li>
          <Link to={"plants"}>
            <MUILink>Plants</MUILink>
          </Link>
        </li>
        <li>
          <Link to={"traders"}>
            <MUILink>Traders</MUILink>
          </Link>
        </li>
      </ul>
      <Outlet />
    </ThemeProvider>
  );
};

export default Home;
