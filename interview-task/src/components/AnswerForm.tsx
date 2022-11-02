import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import GenerateQuestions from "./GenerateQuestions";
import ReactToAnswers from "./ReactToAnswers";
import { addResults } from "../detabase/indexedDB";
import { v4 as uuid } from "uuid";

export default function AnswerForm() {
  const [answer, setAnswer] = useState<number | undefined>();
  const [rightAnswer, setRightAnswer] = useState(0);
  const [isCorrect, setIsCorrect] = useState("");
  const [isError, setIsError] = useState(false);
  const [question, setQuestion] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let currentValue = event.currentTarget.value;
    if (parseInt(currentValue) !== NaN) {
      setAnswer(parseInt(event.currentTarget.value, 10));
    }
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const key = uuid();

    if (!answer) {
      setIsError(true);
    } else if (answer !== rightAnswer) {
      setIsCorrect("Not Correct");
      setIsError(false);
      addResults(key, {
        id: key,
        equation: question,
        answer: answer,
        rightAnswer: rightAnswer,
      });
    } else {
      setIsCorrect("Correct!");
      setIsError(false);
      addResults(key, {
        id: key,
        equation: question,
        answer: answer,
        rightAnswer: rightAnswer,
      });
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
          <GenerateQuestions
            question={question}
            setQuestion={setQuestion}
            setRightAnswer={setRightAnswer}
          />
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
