import type { RouteObject } from "react-router-dom";

import PublicLayout from "../../features/marketing/layout/PublicLayout";
import LandingPage from "../../features/marketing/pages/LandingPage";
import AboutPage from "../../features/marketing/pages/AboutPage";
import ContactPage from "../../features/marketing/pages/ContactPage";

export const routeConfig: RouteObject[] = [
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
];