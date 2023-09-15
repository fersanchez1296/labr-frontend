import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
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

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export const Admin = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeComponent, setActiveComponent] = React.useState("");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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

  const handleNavigation = (component : string) => {
    setActiveComponent(component);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {actions.map((action) => (
          <ListItem key={action.name} disablePadding sx={{ display: "block" }}>
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
            <ListItemButton>
              <ListItemIcon>{<LogoutIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", width : "100vw" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Lab-R CUValles
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "100%",
        }}
      >
        
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
