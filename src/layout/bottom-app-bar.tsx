import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
// import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";

// import SearchIcon from "@mui/icons-material/Search";
// import MoreIcon from "@mui/icons-material/MoreVert";
import { Link, useNavigate } from "react-router-dom";
// import { Icon, Menu } from "@mui/material";
import {
  LocalFloristRounded,
  PersonOutlineOutlined,
} from "@mui/icons-material";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

function BottomAppBar() {
  const navigate = useNavigate();
  const routeIsCreatePlant = !window.location.href.includes("plants/create");
  const routeIs = (routename: string) =>
    window.location.href.includes(routename);
  const selectedRouteStyle = { border: "1px solid grey", borderRadius: "12px" };

  return (
    <>
      <CssBaseline></CssBaseline>
      <AppBar position="sticky" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar style={{ justifyContent: "center" }}>
          {/* <IconButton color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton> */}
          <IconButton
            color="inherit"
            aria-label="go to traders"
            style={routeIs("traders") ? selectedRouteStyle : {}}
          >
            <Link to={"traders"}>
              <Typography variant="h6">Traders</Typography>
              <PersonOutlineOutlined
                style={{ fontSize: "2rem" }}
              ></PersonOutlineOutlined>
            </Link>
          </IconButton>
          {routeIsCreatePlant && (
            <StyledFab
              color="secondary"
              aria-label="add"
              onClick={() => navigate("plants/create")}
            >
              <AddIcon />
            </StyledFab>
          )}

          <Box sx={{ flexGrow: 0.5 }} />
          <IconButton
            color="inherit"
            style={routeIs("plants") ? selectedRouteStyle : {}}
          >
            <Link to={"plants"}>
              <Typography variant="h6">Plants</Typography>
              <LocalFloristRounded
                style={{ fontSize: "2rem" }}
              ></LocalFloristRounded>
            </Link>
          </IconButton>
          {/* <IconButton color="inherit">
            <MoreIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default BottomAppBar;
