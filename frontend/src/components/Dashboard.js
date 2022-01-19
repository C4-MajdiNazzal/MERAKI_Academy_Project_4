import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { AuthContext } from "../context/auth";

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
      const question = {
        title,
        question,
      };
      const result = await axios.post(
        "http://localhost:5000/questions",
        question,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        setStatus(true);
        setMessage("The question has been created successfully");
      }
    } catch (error) {
      if (!error.response.data.success) {
        setStatus(false);
        setMessage(error.response.data.message);
      }
    }
  };

  //===============================================================

  useEffect(() => {
    if (!isLoggedIn) {
      history("/dashboard");
    }
  });

  //===============================================================
  return (
    <>
      <form onSubmit={createNewQuestion}>
        <br />
        <input
          type="text"
          placeholder="question title here"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="question question here"
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
        <br />
        <button>Create New Question</button>
      </form>
      <br />
      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}
    </>
  );
};

export default NewQuestion;
