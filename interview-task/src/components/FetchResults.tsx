import { useState, useEffect } from "react";
import { database } from "../detabase/indexedDB";
import DisplayResults from "./DisplayResults";
import Card from "react-bootstrap/Card";

type resultsProps = {
  id: string;
  equation: string;
  answer: number | undefined;
  rightAnswer: number;
  isCorrect: string;
};

export default function FetchResults() {
  const [results, setResults] = useState<resultsProps[]>([]);
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  const getResults = async () => {
    (await database).getAll("results").then((data) => {
      setResults(data);
      console.log(data);
      data.length ? setIsDataAvailable(true) : setIsDataAvailable(false);
    });
  };

  useEffect(() => {
    getResults();
  }, []);

  return isDataAvailable ? (
    <Card className="m-4">
      <Card.Body className="p-4">
        <Card.Title className="text-capitalize pb-3 fw-bolder">
          previous equations and Student's results
        </Card.Title>
        <DisplayResults results={results} />
      </Card.Body>
    </Card>
  ) : null;
}
