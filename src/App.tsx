import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import AuthGuard from "./guard/auth.guard";
import RoleGuard from "./guard/role.guard";
import { Admin } from "./pages/admin/Admin";
import { Login } from "./pages/login/Login";
import { Student } from "./pages/student/Student";
import { Teacher } from "./pages/teacher/Teacher";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/api.slice";
import { SnackbarProvider } from 'notistack';


function App() {
  return (
    <SnackbarProvider maxSnack={1}>
      <ApiProvider api={apiSlice}>
      <Provider store={store}>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<AuthGuard />}>
              <Route
                path="/admin"
                element={
                  <RoleGuard allowedRoles={["ADMINISTRADOR"]}>
                    <Admin />
                  </RoleGuard>
                }
              />
              <Route
                path="/student"
                element={
                  <RoleGuard allowedRoles={["ALUMNO"]}>
                    <Student />
                  </RoleGuard>
                }
              />
              <Route
                path="/teacher"
                element={
                  <RoleGuard allowedRoles={["PROFESOR"]}>
                    <Teacher />
                  </RoleGuard>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </Provider>
    </ApiProvider>
    </SnackbarProvider>
    
  );
}

export default App;
