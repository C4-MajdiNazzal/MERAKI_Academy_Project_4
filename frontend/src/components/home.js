import { Link } from "react-router-dom";
import "../components/home.css"
const Home = () => {
  return (
    <>
    <div>
      <img className="logo" src="https://englishplatform.uz/wp-content/uploads/2020/12/cropped-English-Platform-2-1536x422.png"/>
    </div>
    <div className="Home">
      <div className="welcome">

      <h1>Your English Platform</h1>
      <h3>Improve Your English and start writing English as an Expert</h3>
      <p className="Links">
        <Link className="Links" to="/register"><button className="buttonstyle">Register</button></Link>{" "}
      </p>
      <p>
        {" "}
        <Link className="Links" to="/login"><button>Login</button></Link>{" "}
      </p>

      </div>

      <div className="drawing">
      <img className="drawingimage" src="https://englishplatform.uz/wp-content/uploads/2020/12/img1-1.png"/>
      </div>

    </div>
    </>
  );
};

export default Home;
