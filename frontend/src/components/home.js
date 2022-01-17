import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>This is a website for an Englist teaching Platform</h1>
      <p>
        <Link to="/register">Register</Link>{" "}
      </p>
      <p>
        {" "}
        <Link to="/login">login</Link>{" "}
      </p>
    </div>
  );
};

export default Home;
