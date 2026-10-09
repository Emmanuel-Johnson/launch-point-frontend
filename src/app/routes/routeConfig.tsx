import { Navigate, type RouteObject } from "react-router-dom";

import PublicLayout from "../../features/marketing/layout/PublicLayout";
import LandingPage from "../../features/marketing/pages/LandingPage";
import AboutPage from "../../features/marketing/pages/AboutPage";
import ContactPage from "../../features/marketing/pages/ContactPage";

import AuthLayout from "../../features/auth/layout/AuthLayout";
import LoginPage from "../../features/auth/pages/LoginPage";
import SignupPage from "../../features/auth/pages/SignupPage";
import ForgotPasswordPage from "../../features/auth/pages/ForgotPasswordPage";
import VerifyEmailPage from "../../features/auth/pages/VerifyEmailPage";
import VerifyResetCodePage from "../../features/auth/pages/VerifyResetCodePage";
import ResetPasswordPage from "../../features/auth/pages/ResetPasswordPage";

import PrivacyPolicyPage from "../../features/marketing/pages/PrivacyPolicyPage";
import TermsPage from "../../features/marketing/pages/TermsPage";

// Student
import StudentLayout from "../../features/student/layout/StudentLayout";
import StudentDashboardPage from "../../features/student/pages/DashboardPage";
import StudentSubscriptionPage from "../../features/student/pages/SubscriptionPage";

// Admin
import AdminLoginPage from "../../features/admin/pages/AdminLoginPage";
import AdminLayout from "../../features/admin/layout/AdminLayout";

import ProtectedRoute from "../../shared/guards/ProtectedRoute";
import PublicRoute from "../../shared/guards/PublicRoute";

import NotFoundPage from "../../features/marketing/pages/NotFoundPage";

import AdminProtectedRoute from "../../shared/guards/AdminProtectedRoute";
import AdminPublicRoute from "../../shared/guards/AdminPublicRoute";
import AdminDashboardPage from "../../features/admin/pages/DashboardPage";

import StudentListPage from "../../features/admin/pages/StudentListPage";
import StudentDetailPage from "../../features/admin/pages/StudentDetailPage";

import SubscriptionPlanListPage from "../../features/admin/pages/SubscriptionPlanListPage";
import SubscriptionPlanDetailPage from "../../features/admin/pages/SubscriptionPlanDetailPage";

// Instructor
import InstructorLayout from "../../features/instructor/layout/InstructorLayout";
import InstructorDashboardPage from "../../features/instructor/pages/DashboardPage";

import StudentProfilePage from "../../features/student/pages/StudentProfilePage";
import CategoryListPage from "../../features/admin/pages/CategoryListPage";
import CategoryDetailPage from "../../features/admin/pages/CategoryDetailPage";

import InstructorPublicLayout from "../../features/instructor/layout/InstructorPublicLayout";
import InstructorLandingPage from "../../features/instructor/pages/InstructorLandingPage";
import InstructorApplicationListPage from "../../features/instructor/pages/InstructorApplicationListPage";
import InstructorApplicationDetailsPage from "../../features/instructor/pages/InstructorApplicationDetailsPage";
import ApplicationLayout from "../../features/admin/layout/ApplicationLayout";
import InstructorApplicationAdminListPage from "../../features/admin/pages/InstructorApplicationAdminListPage";
import InstructorApplicationAdminDetailPage from "../../features/admin/pages/InstructorApplicationAdminDetailPage";

export const routeConfig: RouteObject[] = [
  // =========================
  // Public / Marketing routes
  // =========================
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
    ],
  },

  // =========================
  // Authentication routes
  // =========================
  {
    element: <AuthLayout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/signup",
            element: <SignupPage />,
          },
          {
            path: "/forgot-password",
            element: <ForgotPasswordPage />,
          },
          {
            path: "/verify-email",
            element: <VerifyEmailPage />,
          },
          {
            path: "/verify-reset-code",
            element: <VerifyResetCodePage />,
          },
          {
            path: "/reset-password",
            element: <ResetPasswordPage />,
          },
        ],
      },
    ],
  },

  // =========================
  // Legal routes
  // =========================
  {
    path: "/privacy-policy",
    element: <PrivacyPolicyPage />,
  },
  {
    path: "/terms",
    element: <TermsPage />,
  },

  // =========================
  // Student dashboard
  // =========================
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/student",
        element: <StudentLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <StudentDashboardPage />,
          },
          {
            path: "profile",
            element: <StudentProfilePage />,
          },
          {
            path: "subscriptions",
            element: <StudentSubscriptionPage />,
          },
        ],
      },
    ],
  },

  // Instructor
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/instructor",
        element: <InstructorPublicLayout />,
        children: [
          {
            index: true,
            element: <InstructorLandingPage />,
          },
          {
            path: "applications",
            element: <InstructorApplicationListPage />,
          },
          {
            path: "applications/:applicationId",
            element: <InstructorApplicationDetailsPage />,
          },
        ],
      },
      {
        path: "/instructor/dashboard",
        element: <InstructorLayout />,
        children: [
          {
            index: true,
            element: <InstructorDashboardPage />,
          },
        ],
      },
    ],
  },

  // =========================
  // Admin authentication
  // =========================
  {
    element: <AdminPublicRoute />,
    children: [
      {
        path: "/admin/login",
        element: <AdminLoginPage />,
      },
    ],
  },

  // =========================
  // Admin dashboard
  // =========================
  {
    element: <AdminProtectedRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <AdminDashboardPage />,
          },
          {
            path: "students",
            element: <StudentListPage />,
          },
          {
            path: "students/:studentId",
            element: <StudentDetailPage />,
          },
          // Applications — list views share the Instructor/Course toggle
          {
            path: "applications",
            element: <ApplicationLayout />,
            children: [
              {
                index: true,
                element: <Navigate to="instructors" replace />,
              },
              {
                path: "instructors",
                element: <InstructorApplicationAdminListPage />,
              },
              {
                path: "courses",
                element: <div></div>,
              },
            ],
          },
          // Application detail — standalone, no toggle
          {
            path: "applications/instructors/:applicationId",
            element: <InstructorApplicationAdminDetailPage />,
          },
          // Categories
          {
            path: "categories",
            element: <CategoryListPage />,
          },
          {
            path: "categories/:categoryId",
            element: <CategoryDetailPage />,
          },
          {
            path: "subscriptions",
            element: <SubscriptionPlanListPage />,
          },
          {
            path: "subscriptions/:planId",
            element: <SubscriptionPlanDetailPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
