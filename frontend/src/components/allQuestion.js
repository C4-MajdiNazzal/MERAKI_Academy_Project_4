import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/auth";
import "../components/Questions.css"

const AllQuestion = () => {
  const { token } = useContext(AuthContext);
  const [userId, setUserId] = useState("");
  // const { token} = useContext(AuthContext);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  //====================================================================================
  useEffect(() => {
    getAllQuestions();
  }, []);

  const addAnswer = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/answers/${id}`,
        {
          answer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getAllQuestions();
    } catch (error) {
      console.log(error.response);
    }
  };

  const getAllQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/questions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("res.data", res.data.question);
      if (res.data.success) {
        setQuestion(res.data.question);
        setUserId(res.data.userId);
        console.log(res.data.questionId);
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };
  return (
    <>
    <div>
      <img className="logo" src="https://englishplatform.uz/wp-content/uploads/2020/12/cropped-English-Platform-2-1536x422.png"/>
    </div>
      <div >
        {question &&
          question.map((element) => {
            console.log(element);
            return (
              <>
              <div className="Questions">
                {" "}
                <p> {element.title} </p>
                <p> {element.question} </p>
                <textarea
                  placeholder="write answer"
                  className="textareastyle" rows="20" cols="100"
          placeholder="Type your answer here"
                  onChange={(e) => setAnswer(e.target.value)}
                />
                <button
                  onClick={() => {
                    addAnswer(element._id);
                  }}
                >
                  add answer
                </button>
                
                {/* <p> {element.answers[1].answer} </p>; */}
                {/* <p> {element.answers} </p>; */}
                <p className="Answerheader">Aswers</p>
                {element.answers &&
                  element.answers.map((element) => {
                    return <p>"{element.answer}"</p>;
                  })}
                  </div>
              </>
            );
          })}
          <br/>
      </div>
      <p>{message}</p>
    </>
  );
};

export default AllQuestion;
