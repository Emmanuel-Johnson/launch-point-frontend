import { Navigate, type RouteObject } from "react-router-dom";

import PublicLayout from "../../features/marketing/layout/PublicLayout";
import LandingPage from "../../features/marketing/pages/LandingPage";
import AboutPage from "../../features/marketing/pages/AboutPage";
import ContactPage from "../../features/marketing/pages/ContactPage";
import LoginPage from "../../features/auth/pages/LoginPage";
import SignupPage from "../../features/auth/pages/SignupPage";
import ForgotPasswordPage from "../../features/auth/pages/ForgotPasswordPage";
import VerifyEmailPage from "../../features/auth/pages/VerifyEmailPage";
import VerifyResetCodePage from "../../features/auth/pages/VerifyResetCodePage";
import ResetPasswordPage from "../../features/auth/pages/ResetPasswordPage";
import PrivacyPolicyPage from "../../features/marketing/pages/PrivacyPolicyPage";
import TermsPage from "../../features/marketing/pages/TermsPage";

import StudentLayout from "../../features/student/layout/StudentLayout";
import StudentDashboardPage from "../../features/student/pages/DashboardPage";
import StudentSubscriptionPage from "../../features/student/pages/SubscriptionPage";
import StudentSettingsPage from "../../features/student/pages/StudentSettingsPage";

import AdminLoginPage from "../../features/admin/pages/AdminLoginPage";
import AdminLayout from "../../features/admin/layout/AdminLayout";

import NotFoundPage from "../../features/marketing/pages/NotFoundPage";
import AdminDashboardPage from "../../features/admin/pages/DashboardPage";
import StudentListPage from "../../features/admin/pages/StudentListPage";
import StudentDetailPage from "../../features/admin/pages/StudentDetailPage";
import InstructorListPage from "../../features/admin/pages/InstructorListPage";
import SubscriptionPlanListPage from "../../features/admin/pages/SubscriptionPlanListPage";
import SubscriptionPlanDetailPage from "../../features/admin/pages/SubscriptionPlanDetailPage";

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
import InstructorProfilePage from "../../features/instructor/pages/InstructorProfilePage";
import InstructorDetailPage from "../../features/admin/pages/InstructorDetailPage";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import InstructorSettingsPage from "../../features/instructor/pages/InstructorSettingsPage";
import CourseListPage from "../../features/admin/pages/CourseListPage";
import LevelManagementPage from "../../features/admin/pages/LevelManagementPage";
import SkillManagementPage from "../../features/admin/pages/skills/SkillManagementPage";
import CourseApplicationAdminListPage from "../../features/admin/pages/CourseApplicationAdminListPage";
import NonAdminRoute from "./NonAdminRoute";

export const routeConfig: RouteObject[] = [
  {
    element: <NonAdminRoute />,
    children: [
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
    ],
  },
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
  {
    path: "/privacy-policy",
    element: <PrivacyPolicyPage />,
  },
  {
    path: "/terms",
    element: <TermsPage />,
  },

  {
    element: <ProtectedRoute allowedRoles={["student"]} />,
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
          {
            path: "settings",
            element: <StudentSettingsPage />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={["student", "instructor"]} />,
    children: [
      {
        path: "/instructor-landing",
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
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={["instructor"]} />,
    children: [
      {
        path: "/instructor",
        element: <InstructorLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <InstructorDashboardPage />,
          },
          {
            path: "profile",
            element: <InstructorProfilePage />,
          },
          {
            path: "settings",
            element: <InstructorSettingsPage />,
          },
        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/admin/login",
        element: <AdminLoginPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={["admin"]} />,
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
          {
            path: "instructors",
            element: <InstructorListPage />,
          },
          {
            path: "instructors/:instructorId",
            element: <InstructorDetailPage />,
          },
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
                element: <CourseApplicationAdminListPage />,
              },
            ],
          },

          {
            path: "applications/instructors/:applicationId",
            element: <InstructorApplicationAdminDetailPage />,
          },
          {
            path: "courses",
            element: <CourseListPage />,
          },
          {
            path: "courses/course-levels",
            element: <LevelManagementPage />,
          },
          {
            path: "courses/skills",
            element: <SkillManagementPage />,
          },
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
