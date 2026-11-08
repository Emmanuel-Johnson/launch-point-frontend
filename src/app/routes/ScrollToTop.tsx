import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll the browser window
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    // Scroll the instructor content container
    const instructorContainer = document.querySelector(
      ".instructor-page-scrollbar",
    );

    instructorContainer?.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
