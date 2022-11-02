import axios from "axios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

export default function GenerateQuestions({
  setRightAnswer,
}: {
  setRightAnswer: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
  const [question, setQuestion] = useState("");

  const BASE_URL = "https://api.mathjs.org/";

  const A = Math.floor(Math.random() * 1000);
  const B = Math.floor(Math.random() * 1000);
  const Equation = A + " + " + B;

  useEffect(() => {
    setQuestion(Equation + " =");
    getAnswer();
  }, []);

  const getAnswer = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}v4?expr=${A}%2B${B}`);
      setRightAnswer(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  return <Card.Text>{question}</Card.Text>;
}
