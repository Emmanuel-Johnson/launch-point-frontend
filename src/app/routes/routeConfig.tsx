import type { RouteObject } from "react-router-dom";

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
import Home from "../../features/student/pages/Home";

// Admin
import AdminLoginPage from "../../features/admin/pages/AdminLoginPage";
import AdminLayout from "../../features/admin/layout/AdminLayout";
import AdminDashboard from "../../features/admin/pages/AdminDashboard";

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
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
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
    path: "/student",
    element: <StudentLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
    ],
  },

  // =========================
  // Admin authentication
  // =========================
  {
    path: "/admin/login",
    element: <AdminLoginPage />,
  },

  // =========================
  // Admin dashboard
  // =========================
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
    ],
  },
];