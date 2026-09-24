import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useFavicon = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');

    if (!favicon) return;

    let faviconPath = "/student_logo.png";

    if (pathname.includes("/instructor")) {
      faviconPath = "/instructor_logo.png";
    } else if (pathname.includes("/admin")) {
      faviconPath = "/admin_logo.png";
    } else if (pathname.includes("/student")) {
      faviconPath = "/student_logo.png";
    }

    favicon.href = faviconPath;

    console.log("Current path:", pathname);
    console.log("Current favicon:", faviconPath);
  }, [pathname]);
};

export default useFavicon;
