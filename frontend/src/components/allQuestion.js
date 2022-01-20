import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


import { AuthContext } from "../context/auth";

const AllQuestion = () => {
  const { token } = useContext(AuthContext);
  const [userId, setUserId] = useState("");
  const [question, setQuestion] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  //====================================================================================

  const getAllQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/questions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setQuestion(res.data.questions);
        console.log(res.data.questions);
        setMessage("");
        setShow(true);
        setUserId(res.data.userId);
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
    // useEffect(() => {
    //   getAllQuestions();
    // }, []);
    return (
      <>
        <div className="Form">
          {question &&
            question.map((element) => {
             return <p> element.question </p>;
            })}
        </div>
      </>
    );
  };
};

export default AllQuestion;
