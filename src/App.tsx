import AppRoutes from "./app/routes/AppRoutes";
import ScrollToTop from "./app/routes/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./shared/toast.css";
import useFavicon from "./shared/hooks/useFavicon";

function App() {
  useFavicon();
  return (
    <>
      <ScrollToTop />
      <AppRoutes />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
