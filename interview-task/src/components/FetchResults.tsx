import { useState, useEffect } from "react";
import { database } from "../detabase/indexedDB";
import DisplayResults from "./DisplayResults";
import Card from "react-bootstrap/Card";

type resultProps = {
  id: string;
  equation: string;
  answer: number | undefined;
  rightAnswer: number;
};

export default function FetchResults() {
  const [results, setResults] = useState<resultProps[]>([]);
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  const getResults = async () => {
    (await database).getAll("results").then((data) => {
      setResults(data);
      data.length ? setIsDataAvailable(true) : setIsDataAvailable(false);
    });
  };

  useEffect(() => {
    getResults();
  }, [results.length]);

  return isDataAvailable ? (
    <Card id="results" className="m-4">
      <Card.Body className="p-4">
        <Card.Title className="text-capitalize pb-3 fw-bolder">
          previous equations and Student's results
        </Card.Title>
        <DisplayResults results={results} />
      </Card.Body>
    </Card>
  ) : null;
}
