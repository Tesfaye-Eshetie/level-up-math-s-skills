import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

export default function GenerateQuestions() {
  const [question, setQuestion] = useState("");

  useEffect(() => {
    const A = Math.floor(Math.random() * 1000);
    const B = Math.floor(Math.random() * 1000);
    setQuestion(A + " + " + B + " =");
  }, []);

  return <Card.Text>{question}</Card.Text>;
}
