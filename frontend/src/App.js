import "./App.css";
import { Route, Routes } from "react-router-dom";

// import Navigation from "./components/navigation";
import Register from "./components/register";
import Login from "./components/login";
import Home from "./components/home"
// import Dashboard from "./components/dashboard";
// import NewArticle from "./components/newArticle";

//===============================================================

const App = () => {
  return (
    <div className="App">
      {/* <Navigation/> */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home/>} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/newArticle" element={<NewArticle />} /> */}
      </Routes>
    </div>
  );
};

export default App;
