import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";


import axios from "axios";

import { AuthContext } from "../context/auth";

import "../components/login.css"


//===============================================================

const NewQuestion = () => {
  const { token, isLoggedIn } = useContext(AuthContext);
  const history = useNavigate();

  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  //===============================================================

  const createNewQuestion = async (e) => {
    e.preventDefault();
    try {
      const Question = {
        title,
        question,
      };
      const result = await axios.post(
        "http://localhost:5000/questions",
        Question,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result);
      if (result.data.success) {
        setStatus(true);
        setMessage("The question has been created successfully");
      }
    } catch (error) {
      // if (!error.response.data.success) {
        setStatus(false);
        // setMessage(error.response.data.message);
      }
    }
;

  //===============================================================

  useEffect(() => {
    if (!isLoggedIn) {
      history("/dashboard");
    }
  });

  //===============================================================
  return (
    <>
    <div className="Form">
    <div>
      <img className="logo" src="https://englishplatform.uz/wp-content/uploads/2020/12/cropped-English-Platform-2-1536x422.png"/>
    </div>
      <form onSubmit={createNewQuestion}>
        <br />
        <input
          type="text"
          placeholder="Type question title here"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea className="textareastyle" rows="20" cols="100"
          placeholder="Type question here"
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
        <br />
        <button >Create New Question</button>
      </form>
      <br />
      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}
        <p className="Links">
        <Link className="Links" to="/allquestions">Continue to Questions Page</Link>{" "}
      </p>
        </div>

    </>
  );
      }     

export default NewQuestion;
