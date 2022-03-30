import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LoginScreen } from "../components/auth/LoginScreen";
import { DashboardRoutes } from "./DashboardRoutes";
import { startChecking } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

function AppRouter() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element= {
          <PublicRoute>
            <LoginScreen/>
          </PublicRoute>
        }/>

        <Route path='/*' element={
          <PrivateRoute>
            <DashboardRoutes/>
          </PrivateRoute>
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
