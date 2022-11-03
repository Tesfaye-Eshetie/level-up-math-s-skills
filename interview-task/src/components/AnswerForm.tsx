import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import ReactToAnswers from "./ReactToAnswers";
import { addResults } from "../detabase/indexedDB";
import { v4 as uuid } from "uuid";

export default function AnswerForm() {
  const [answer, setAnswer] = useState("");
  const [rightAnswer, setRightAnswer] = useState(0);
  const [isCorrect, setIsCorrect] = useState("");
  const [isError, setIsError] = useState(false);
  const [question, setQuestion] = useState("");

  const BASE_URL = "https://api.mathjs.org/";
  const operatorsArray = [" + ", " - ", " x ", " ÷ "];
  const operator =
    operatorsArray[Math.floor(Math.random() * operatorsArray.length)];
  let exp: string;
  switch (operator) {
    case " + ":
      exp = "%2B";
      break;
    case " - ":
      exp = "%2D";
      break;
    case " x ":
      exp = "%2A";
      break;
    case " ÷ ":
      exp = "%2F";
      break;
    default:
      console.log("Something went wrong.");
  }
  const A = Math.floor(Math.random() * 1000);
  const B = Math.floor(Math.random() * 100);
  const Equation = `${A}${operator}${B}`;

  useEffect(() => {
    setQuestionAndAnswer();
  }, []);

  const setQuestionAndAnswer = () => {
    setQuestion(Equation + " =");
    getAnswer();
    setIsCorrect("");
    setAnswer("");
  };
  const getAnswer = async () => {
    try {
      const Expression = `${A}${exp}${B}`;
      const { data } = await axios.get(`${BASE_URL}v4?expr=${Expression}`);
      setRightAnswer(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.currentTarget.value);
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const key = uuid();

    if (!answer || parseInt(answer) === NaN) {
      setIsError(true);
      setAnswer("");
    } else if (parseInt(answer).toFixed(2) !== rightAnswer.toFixed(2)) {
      setIsCorrect("Not Correct");
      setIsError(false);
      addResults(key, {
        id: key,
        equation: question,
        answer: parseInt(answer),
        rightAnswer: rightAnswer,
      });
      setTimeout(setQuestionAndAnswer, 1000);
    } else {
      setIsCorrect("Correct!");
      setIsError(false);
      addResults(key, {
        id: key,
        equation: question,
        answer: parseInt(answer),
        rightAnswer: rightAnswer,
      });
      setTimeout(setQuestionAndAnswer, 1000);
    }
  };

  return (
    <Card className="m-4" id="equations">
      <Card.Body className="p-4">
        <Card.Title className="text-capitalize pb-3 fw-bolder">
          Evaluate the following equation
        </Card.Title>
        {isCorrect ? <ReactToAnswers isCorrect={isCorrect} /> : null}
        <Form
          action="/"
          noValidate
          onSubmit={handleSubmit}
          className="d-flex justify-content-around align-items-baseline form"
        >
          <Card.Text>{question}</Card.Text>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={answer}
              onChange={handleChange}
              placeholder="Answer..."
              required
            />
            {isError ? (
              <Form.Text>
                <p className="text-danger">
                  Missing answer or only inter number?
                </p>
              </Form.Text>
            ) : null}
          </Form.Group>
          <Button type="submit">Submit Answer</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
