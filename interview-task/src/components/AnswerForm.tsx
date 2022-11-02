import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import GenerateQuestions from "./GenerateQuestions";
import ReactToAnswers from "./ReactToAnswers";

export default function AnswerForm() {
  const [answer, setAnswer] = useState<number>();
  const [rightAnswer, setRightAnswer] = useState<number>();
  const [correct, setCorrect] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(parseInt(event.currentTarget.value, 10));
    console.log(event.currentTarget.value);
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!answer) {
      setIsError(true);
    } else if (answer !== rightAnswer) {
      setCorrect("Try again?");
      setIsError(false);
    } else {
      setCorrect("Correct!");
      setIsError(false);
    }
  };

  return (
    <Card className="m-4" id="equations">
      <Card.Body className="p-4">
        <Card.Title className="text-capitalize pb-3 fw-bolder">
          Evaluate the following equation
        </Card.Title>
        {correct ? <ReactToAnswers correct={correct} /> : null}
        <Form
          action="/"
          noValidate
          onSubmit={handleSubmit}
          className="d-flex justify-content-around align-items-baseline form"
        >
          <GenerateQuestions setRightAnswer={setRightAnswer} />
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
                <p className="text-danger">Answer is requered?</p>
              </Form.Text>
            ) : null}
          </Form.Group>
          <Button type="submit">Submit Answer</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
