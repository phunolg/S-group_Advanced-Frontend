import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "../shared/ProtectedRoute";
import AxiosInterceptor from "../shared/config/axiosInterceptor";
import LoginPage from "../pages/login/ui/LoginPage";
import Dashboard from "../pages/dashboard/ui/Dashboard";
import { AppLayout } from "../features/app/ui/AppLayout";

function App() {
  useEffect(() => {
    AxiosInterceptor();
  }, []);

  return (
    <BrowserRouter basename={import.meta.env.PROD ? "/S-group_Advanced-Frontend" : ""}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;