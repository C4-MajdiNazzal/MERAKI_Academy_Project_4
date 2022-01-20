import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/auth";

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
        `http://localhost:5000/answers/`,
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
        console.log(question);
        console.log(res.data.question);
        // setMessage(res.data,message);
        // setShow(true);
        setUserId(res.data.userId);
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
      <div className="Form">
        {question &&
          question.map((element) => {
            console.log(element);
            return (
              <>
                {" "}
                <p> {element.title} </p>
                <p> {element.question} </p>;
                
                <input placeholder="write answer"
                onChange={(e) => setAnswer(e.target.value)} />
                <button  onClick={() => {
                  addAnswer(answer._id);
                }} >add answer</button>
              </>
            );
          })}
          <p> {answer} </p>
      </div>
      <p>{message}</p>
    </>
  );
};

export default AllQuestion;
