import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { AuthProvider } from "./utils/contexts/auth/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "./routes/signon/login/LoginPage";
import RegisterPage from "./routes/signon/register/RegisterPage";
import Dashboard from "./Dashboard";
import Landing from "./routes/landing/Landing";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/landing" element={<Landing />} />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
