/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  Typography,
  Paper,
  Button,
  Container,
} from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import BottomAppBar from "../../layout/bottom-app-bar";

const Home: React.FC = () => {
  const [mode, setMode] = React.useState<PaletteMode>("dark");
  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const defaultTheme = createTheme({ palette: { mode } });

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Paper
          square
          sx={{
            pb: "10px",
            position: "sticky",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
          }}
        >
          {/* funkar bra som breadcrumb visare, eller något som säger vart du är någonstans i appen. @todo hitta hur man visar ens nuvarande path, eller route, programmatiskt? */}
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ p: 2, pb: 0 }}
          >
            PotterExpert
            <Button onClick={() => toggleColorMode()}>LIGHT/DARK</Button>
          </Typography>
        </Paper>
        <Container>
          <Outlet />
        </Container>
        <BottomAppBar></BottomAppBar>
      </ThemeProvider>
    </>
  );
};

export default Home;
