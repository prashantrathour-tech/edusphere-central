import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import SystemOwner from "./pages/dashboards/SystemOwner";
import OrgAdmin from "./pages/dashboards/OrgAdmin";
import Teacher from "./pages/dashboards/Teacher";
import Student from "./pages/dashboards/Student";
import Parent from "./pages/dashboards/Parent";
import ClassManagement from "./pages/teacher/ClassManagement";
import TeacherAnalytics from "./pages/teacher/Analytics";
import AdminAnalytics from "./pages/admin/Analytics";
import StudentAnalytics from "./pages/student/Analytics";
import StudentCalendar from "./pages/student/Calendar";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import AuthProtectedRoute from "./components/AuthProtectedRoute";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/auth" /> : <Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/login" element={<Navigate to="/auth" replace />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      <Route
        path="/system-owner/*"
        element={
          <AuthProtectedRoute allowedRoles={['system_owner']}>
            <SystemOwner />
          </AuthProtectedRoute>
        }
      />
      <Route
        path="/org-admin/*"
        element={
          <AuthProtectedRoute allowedRoles={['org_admin']}>
            <OrgAdmin />
          </AuthProtectedRoute>
        }
      />
      <Route
        path="/teacher"
        element={
          <AuthProtectedRoute allowedRoles={['teacher', 'class_teacher']}>
            <Teacher />
          </AuthProtectedRoute>
        }
      />
      <Route
        path="/teacher/classes"
        element={
          <AuthProtectedRoute allowedRoles={['teacher', 'class_teacher']}>
            <ClassManagement />
          </AuthProtectedRoute>
        }
      />
      <Route
        path="/teacher/analytics"
        element={
          <AuthProtectedRoute allowedRoles={['teacher', 'class_teacher']}>
            <TeacherAnalytics />
          </AuthProtectedRoute>
        }
      />
      <Route
        path="/org-admin/analytics"
        element={
          <AuthProtectedRoute allowedRoles={['org_admin']}>
            <AdminAnalytics />
          </AuthProtectedRoute>
        }
      />
      <Route
        path="/student"
        element={
          <AuthProtectedRoute allowedRoles={['student']}>
            <Student />
          </AuthProtectedRoute>
        }
      />
      <Route
        path="/student/analytics"
        element={
          <AuthProtectedRoute allowedRoles={['student']}>
            <StudentAnalytics />
          </AuthProtectedRoute>
        }
      />
      <Route
        path="/student/calendar"
        element={
          <AuthProtectedRoute allowedRoles={['student']}>
            <StudentCalendar />
          </AuthProtectedRoute>
        }
      />
      <Route
        path="/parent/*"
        element={
          <AuthProtectedRoute allowedRoles={['parent']}>
            <Parent />
          </AuthProtectedRoute>
        }
      />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
