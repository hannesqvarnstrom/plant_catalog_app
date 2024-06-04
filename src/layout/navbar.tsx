import { useState } from "react";
import {
  Add,
  Home as HomeIcon,
  Menu,
  LocalFloristOutlined,
  PeopleAltOutlined,
  Person2Outlined,
  Settings,
} from "@mui/icons-material";
import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { NavbarProps } from "../pages/page-prop-types";

const Navbar: React.FC<NavbarProps> = ({ authenticated }: NavbarProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  console.log(authenticated);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawerOpen(open);
    };
  const menuItems = [
    { text: "Dashboard", icon: <HomeIcon />, path: "/dashboard" },
    { text: "Create Plant", icon: <Add />, path: "/plants/create" },
    { text: "Plants", icon: <LocalFloristOutlined />, path: "/plants" },
    {
      text: "Create Trader",
      icon: <Person2Outlined />,
      path: "/traders/create",
    },
    { text: "Traders", icon: <PeopleAltOutlined />, path: "/traders" },
    // { text: "Logout", icon: <Logout />, path: "/logout" }, // <---- how to do? maybe onClick or something
    { text: "Settings", icon: <Settings />, path: "/settings" }, // <---- set darkmode/lightmode, perhaps something else?
  ];

  const drawerList = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index} component={NavLink} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            Plant Catalog
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList()}
      </Drawer>
      <Toolbar /> {/* this is to push the content below the AppBar ?!*/}
    </>
  );
};

export default Navbar;
