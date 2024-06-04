import { Button, Container } from "@mui/material";

import { useSettingsStore } from "../../store/settings";
import { useUsersStore } from "../../store/users";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings: React.FC = () => {
  const settings = useSettingsStore();
  const usersStore = useUsersStore();
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(usersStore.currentUser !== undefined);
  }, [usersStore.currentUser]);
  return (
    <Container>
      <Button onClick={settings.toggleColorMode}>
        Brightness mode: {settings.paletteMode === "dark" ? "Dark" : "Light"}
      </Button>
      {authenticated ? (
        <Button
          onClick={() => {
            usersStore.logOut();
            navigate("/");
          }}
        >
          Log out
        </Button>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Settings;
