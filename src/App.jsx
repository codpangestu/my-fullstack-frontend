import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepages from "./pages/Homepages";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MovieDetail from "./pages/MovieDetail";
import Movies from "./pages/Movies";
import UserDetail from "./pages/UserDetail";
import Users from "./pages/Users";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

import AdminDashboard from "./pages/admin/AdminDashboard";
import MovieForm from "./pages/admin/MovieForm";
import AdminEditMovie from "./pages/admin/AdminEditMovie";

import AdminUsers from "./pages/admin/AdminUsers";
import AdminUserEdit from "./pages/admin/AdminUserEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Homepages />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER (LOGIN REQUIRED) */}
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:id"
          element={
            <ProtectedRoute>
              <UserDetail />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/movies/edit/:id"
          element={
            <ProtectedRoute role="admin">
              <AdminEditMovie />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/movies/create"
          element={
            <ProtectedRoute role="admin">
              <MovieForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/movies/edit/:id"
          element={
            <ProtectedRoute role="admin">
              <MovieForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users/edit/:id"
          element={
            <ProtectedRoute role="admin">
              <AdminUserEdit />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
