import { Routes, Route } from "react-router-dom";
import LandingPage from "../../features/landing/pages/LandingPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export default AppRoutes;
