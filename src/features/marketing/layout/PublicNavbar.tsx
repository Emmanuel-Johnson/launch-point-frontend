import { Link } from "react-router-dom";

const PublicNavbar = () => {
  console.log("PublicNavbar component");

  return (
    <nav>
      <h2>LMS</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default PublicNavbar;