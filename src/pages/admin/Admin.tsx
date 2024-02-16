import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import BookIcon from "@mui/icons-material/Book";
import HardwareIcon from "@mui/icons-material/Hardware";
import ScienceIcon from "@mui/icons-material/Science";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import { Users } from "./users/Users";
import { Laboratorios } from "./labs/Laboratorios";
import { Materias } from "./materias/Materias";
import { Practicas } from "./practicas/Practicas";
import { Reservas } from "./reservas/Reservas";
import { Equipo } from "./equipo/Equipo";
import { getFromLocalStorage } from "../../utilities/localStorage.utilities";
import { useDispatch } from 'react-redux';
import { resetUser } from "../../redux/states/user";
import { useNavigate } from "react-router-dom";
import { replace } from "formik";

const drawerWidth = 240;


const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const Admin = () => {
  const userData = getFromLocalStorage("user");
  console.log(userData);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [activeComponent, setActiveComponent] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
     dispatch(resetUser());
     navigate("/",{replace : true})
    };
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const actions = [
    {
      icon: <PersonIcon />,
      name: "Usuarios",
      route: "/usuarios",
      component: "users",
    },
    {
      icon: <BookIcon />,
      name: "Materias",
      route: "/materias",
      component: "materias",
    },
    {
      icon: <HardwareIcon />,
      name: "Prácticas",
      route: "/practicas",
      component: "practicas",
    },
    {
      icon: <ScienceIcon />,
      name: "Laboratorios",
      route: "/laboratorios",
      component: "labs",
    },
    {
      icon: <CalendarMonthIcon />,
      name: "Reservas",
      route: "/reservas",
      component: "reservas",
    },
    {
      icon: <HomeRepairServiceIcon />,
      name: "Equipo",
      route: "/equipo",
      component: "equipo",
    },
  ];

  const handleNavigation = (component: string) => {
    setActiveComponent(component);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box component="main" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ marginRight: 1 }}
            >
              Lab-R CUValles
            </Typography>
            
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ marginRight: 1 }}
            >
              {userData.rol}
            </Typography>
            
            <Typography variant="h6" noWrap component="div">
              {userData.nombre}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {actions.map((action) => (
            <ListItem
              key={action.name}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                }}
                onClick={() => handleNavigation(action.component)}
              >
                <ListItemIcon>{action.icon}</ListItemIcon>
                <ListItemText primary={action.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Cerrar Sesión"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>{<LogoutIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {activeComponent === "users" ? <Users /> : null}
        {activeComponent === "materias" ? <Materias /> : null}
        {activeComponent === "practicas" ? <Practicas /> : null}
        {activeComponent === "reservas" ? <Reservas /> : null}
        {activeComponent === "equipo" ? <Equipo /> : null}
        {activeComponent === "labs" ? <Laboratorios /> : null}
      </Box>
    </Box>
  );
};