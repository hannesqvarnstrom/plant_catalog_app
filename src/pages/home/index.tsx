/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
  Container,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  GoogleCredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { UserFromServer, useUsersStore } from "../../store/users";
import httpAgent from "../../http";
import { usePlantStore } from "../../store/plants";
import { useTraderStore } from "../../store/traders/traders";
import Navbar from "../../layout/navbar";
import { useSettingsStore } from "../../store/settings";

const Home: React.FC = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
  const settingsStore = useSettingsStore();

  const [authenticated, setAuthenticated] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL as string;
  const navigate = useNavigate();
  const usersStore = useUsersStore();
  const plantsStore = usePlantStore();
  const tradersStore = useTraderStore();
  const location = useLocation();

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
          if (location.pathname === "/") {
            navigate("/dashboard");
          }

          setAuthenticated(true);
        })
        .catch(() => {
          setAuthenticated(false);
          usersStore.logOut();
          navigate("/");
          // navigate("/");
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

  const defaultTheme = createTheme({
    palette: { mode: settingsStore.paletteMode },
  });
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
          <>
            <Navbar authenticated={authenticated} />
            <Container>
              <Typography
                variant="h5"
                gutterBottom
                component="div"
                sx={{ p: 2, pb: 0 }}
              ></Typography>

              <Outlet />
            </Container>
          </>
        )}
        {/* <BottomAppBar></BottomAppBar> */}
      </ThemeProvider>
    </>
  );
};

export default Home;
