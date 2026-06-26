import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProjectDetails from "./pages/ProjectDetails";              

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/login" />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      /><Route
  path="/upload"
  element={
    <ProtectedRoute>
      <UploadPage />
    </ProtectedRoute>
  }
/>
      <Route
        path="/projects/:id"
        element={
          <ProtectedRoute>
            <ProjectDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;