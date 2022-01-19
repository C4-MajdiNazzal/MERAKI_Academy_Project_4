import { Link } from "react-router-dom";
import "../components/home.css"

const Home = () => {
  return (
    <div className="Home">
      <div className="welcome">
      <h1>This is a website for an Englist teaching Platform</h1>
      </div>
      <div className="Links">
      <p className="Links">
        <Link className="Links" to="/register">Register</Link>{" "}
      </p>
      <p>
        {" "}
        <Link className="Links" to="/login">login</Link>{" "}
      </p>
      </div>
    </div>
  );
};

export default Home;
