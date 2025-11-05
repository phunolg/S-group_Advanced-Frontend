import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "../shared/ProtectedRoute";
import AxiosInterceptor from "../shared/config/axiosInterceptor";
import { AppLayout } from "../features/app/ui/AppLayout";

// Lazy load pages
const LoginPage = lazy(() => import("../pages/login/ui/LoginPage"));
const Dashboard = lazy(() => import("../pages/dashboard/ui/Dashboard"));
const BoardView = lazy(() => import("../pages/board/ui/BoardView"));

function App() {
  useEffect(() => {
    AxiosInterceptor();
  }, []);

  return (
    <BrowserRouter basename={import.meta.env.PROD ? "/S-group_Advanced-Frontend" : ""}>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="board/:boardId" element={<BoardView />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;