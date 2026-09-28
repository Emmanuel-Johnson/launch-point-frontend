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

      {/* Normal / Student Toast */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />

      {/* Admin Toast */}
      <ToastContainer
        containerId="admin"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
        toastClassName="admin-toast"
        progressClassName="admin-toast-progress"
      />
    </>
  );
}

export default App;
