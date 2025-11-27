import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from '@/store/hooks';
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SystemOwner from "./pages/dashboards/SystemOwner";
import OrgAdmin from "./pages/dashboards/OrgAdmin";
import Teacher from "./pages/dashboards/Teacher";
import Student from "./pages/dashboards/Student";
import Parent from "./pages/dashboards/Parent";
import ClassManagement from "./pages/teacher/ClassManagement";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/login" /> : <Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      <Route
        path="/system-owner/*"
        element={
          <ProtectedRoute allowedRoles={['system_owner']}>
            <SystemOwner />
          </ProtectedRoute>
        }
      />
      <Route
        path="/org-admin/*"
        element={
          <ProtectedRoute allowedRoles={['org_admin']}>
            <OrgAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher"
        element={
          <ProtectedRoute allowedRoles={['teacher', 'class_teacher']}>
            <Teacher />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/classes"
        element={
          <ProtectedRoute allowedRoles={['teacher', 'class_teacher']}>
            <ClassManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/*"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <Student />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parent/*"
        element={
          <ProtectedRoute allowedRoles={['parent']}>
            <Parent />
          </ProtectedRoute>
        }
      />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
