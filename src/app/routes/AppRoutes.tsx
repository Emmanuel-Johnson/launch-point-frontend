import { Routes, Route } from "react-router-dom";
import Home from "../../features/courses/pages/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
