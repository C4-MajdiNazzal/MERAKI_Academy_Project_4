import { Link } from "react-router-dom";
import "../components/home.css"

const Home = () => {
  return (
    <div className="Home">
      <div className="welcome">
      <h1>Your English Platform</h1>
      <h3>Improve Your English and start writing English as an Expert</h3>
      </div>
      <div className="Links">
      <p className="Links">
        <Link className="Links" to="/register"><button className="buttonstyle">Register</button></Link>{" "}
      </p>
      <p>
        {" "}
        <Link className="Links" to="/login"><button>Login</button></Link>{" "}
      </p>
      </div>
    </div>
  );
};

export default Home;
