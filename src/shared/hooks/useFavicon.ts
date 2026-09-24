import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useFavicon = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');

    if (!favicon) return;

    const firstSegment = pathname.split("/")[1];

    let faviconPath = "/student_logo.png";

    if (firstSegment === "admin") {
      faviconPath = "/admin_logo.png";
    } else if (firstSegment === "instructor") {
      faviconPath = "/instructor_logo.png";
    } else if (firstSegment === "student") {
      faviconPath = "/student_logo.png";
    }

    favicon.href = faviconPath;

    console.log("Current path:", pathname);
    console.log("Current favicon:", faviconPath);
  }, [pathname]);
};

export default useFavicon;
