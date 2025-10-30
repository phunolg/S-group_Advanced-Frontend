import { LoginPage } from "../pages";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/dashboard/DashboardPage";
import { RequireAuth } from "../shared/auth/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;