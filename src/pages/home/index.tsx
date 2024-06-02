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
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import BottomAppBar from "../../layout/bottom-app-bar";
import {
  GoogleCredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { UserFromServer, useUsersStore } from "../../store/users";
import httpAgent from "../../http";
import { usePlantStore } from "../../store/plants";
import { useTraderStore } from "../../store/traders/traders";

const Home: React.FC = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
  const [mode, setMode] = React.useState<PaletteMode>("dark");
  const [authenticated, setAuthenticated] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL as string;
  const navigate = useNavigate();
  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };
  const usersStore = useUsersStore();
  const plantsStore = usePlantStore();
  const tradersStore = useTraderStore();

  useEffect(() => {
    if (usersStore.currentUser) {
      httpAgent
        .get<{
          me: {
            id: number;
            email: string;
          };
        }>(backendURL + "/me")
        .then(() => {
          // navigate("/plants");
          setAuthenticated(true);
        })
        .catch(() => {
          setAuthenticated(false);
          usersStore.logOut();
          navigate("/");
        });
    } else {
      setAuthenticated(false);
      usersStore.logOut();
      navigate("/");
    }
  }, [usersStore.currentUser, backendURL, navigate]);

  useEffect(() => {
    async function initStores() {
      await plantsStore.fetch();
      await tradersStore.fetch();
    }

    void initStores().then(() => {
      console.log("store init");
    });
  }, [usersStore.currentUser]);

  const defaultTheme = createTheme({ palette: { mode } });
  const handleLoginSuccess = async (response: GoogleCredentialResponse) => {
    const token = response.credential;
    if (!token) {
      console.error("token missing");
      return;
    }
    try {
      const responseFromBackend = await httpAgent.post<UserFromServer>(
        backendURL + "/auth/google",
        {
          providerToken: token,
        }
      );

      const userPayload = responseFromBackend.data;
      usersStore.setCurrentUser(userPayload);
    } catch (error) {
      console.error("failed to authenticate with backend", error);
    }
  };

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
            zIndex: 2,
          }}
        >
          {/* funkar bra som breadcrumb visare, eller något som säger vart du är någonstans i appen. @todo hitta hur man visar ens nuvarande path, eller route, programmatiskt? */}
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ p: 2, pb: 0 }}
          >
            Plant Catalog
            <Button onClick={() => toggleColorMode()}>LIGHT/DARK</Button>
            {authenticated ? (
              <span>
                <button
                  onClick={() => {
                    usersStore.logOut();
                    navigate("/");
                  }}
                >
                  Log out
                </button>
              </span>
            ) : (
              <></>
            )}
          </Typography>
        </Paper>
        <Container>
          {!authenticated ? (
            <GoogleOAuthProvider clientId={clientId}>
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={() => {
                  console.error("login failed");
                }}
              ></GoogleLogin>
            </GoogleOAuthProvider>
          ) : (
            <Outlet />
          )}
        </Container>
        <BottomAppBar></BottomAppBar>
      </ThemeProvider>
    </>
  );
};

export default Home;
