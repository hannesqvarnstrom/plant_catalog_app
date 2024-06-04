import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { useSettingsStore } from "../../store/settings";
import { useUsersStore } from "../../store/users";
import { useNavigate } from "react-router-dom";
import { LightMode, DarkMode } from "@mui/icons-material";

const Settings: React.FC = () => {
  const settings = useSettingsStore();
  const usersStore = useUsersStore();
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(usersStore.currentUser !== undefined);
  }, [usersStore.currentUser]);

  const handleModeChange = () => {
    settings.toggleColorMode();
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={4} mb={4}>
        <Typography variant="h5" gutterBottom>
          Settings
        </Typography>
        {/* <Typography variant="body1" color="textSecondary" gutterBottom>
          Customize your preferences
        </Typography> */}
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
        <FormControlLabel
          control={
            <Switch
              checked={settings.paletteMode === "dark"}
              onChange={handleModeChange}
              icon={<LightMode />}
              checkedIcon={<DarkMode />}
              color="primary"
            />
          }
          label={`Brightness mode: ${settings.paletteMode === "dark" ? "Dark" : "Light"}`}
        />
      </Box>
      {authenticated && (
        <>
          <Divider sx={{ mb: 4, backgroundColor: "text.primary" }} />
          <Box textAlign="center">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                usersStore.logOut();
                navigate("/");
              }}
            >
              Log out
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Settings;

// import React, { useEffect, useState } from "react";
// import { Button, Container, Box, Typography, Paper } from "@mui/material";
// import { useSettingsStore } from "../../store/settings";
// import { useUsersStore } from "../../store/users";
// import { useNavigate } from "react-router-dom";

// const Settings: React.FC = () => {
//   const settings = useSettingsStore();
//   const usersStore = useUsersStore();
//   const navigate = useNavigate();

//   const [authenticated, setAuthenticated] = useState(false);

//   useEffect(() => {
//     setAuthenticated(usersStore.currentUser !== undefined);
//   }, [usersStore.currentUser]);

//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
//         <Box textAlign="center" mb={2}>
//           <Typography variant="h5" gutterBottom>
//             Settings
//           </Typography>
//           <Typography variant="body1" color="textSecondary">
//             Customize your preferences
//           </Typography>
//         </Box>
//         <Box textAlign="center" mb={2}>
//           <Button
//             variant="contained"
//             onClick={settings.toggleColorMode}
//             sx={{ marginBottom: 2 }}
//           >
//             Brightness mode:{" "}
//             {settings.paletteMode === "dark" ? "Dark" : "Light"}
//           </Button>
//         </Box>
//         {authenticated && (
//           <Box textAlign="center">
//             <Button
//               variant="outlined"
//               color="secondary"
//               onClick={() => {
//                 usersStore.logOut();
//                 navigate("/");
//               }}
//             >
//               Log out
//             </Button>
//           </Box>
//         )}
//       </Paper>
//     </Container>
//   );
// };

// export default Settings;

// // import { Button, Container } from "@mui/material";

// // import { useSettingsStore } from "../../store/settings";
// // import { useUsersStore } from "../../store/users";
// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // const Settings: React.FC = () => {
// //   const settings = useSettingsStore();
// //   const usersStore = useUsersStore();
// //   const navigate = useNavigate();

// //   const [authenticated, setAuthenticated] = useState(false);

// //   useEffect(() => {
// //     setAuthenticated(usersStore.currentUser !== undefined);
// //   }, [usersStore.currentUser]);
// //   return (
// //     <Container>
// //       <Button onClick={settings.toggleColorMode}>
// //         Brightness mode: {settings.paletteMode === "dark" ? "Dark" : "Light"}
// //       </Button>
// //       {authenticated ? (
// //         <Button
// //           onClick={() => {
// //             usersStore.logOut();
// //             navigate("/");
// //           }}
// //         >
// //           Log out
// //         </Button>
// //       ) : (
// //         <></>
// //       )}
// //     </Container>
// //   );
// // };

// // export default Settings;
