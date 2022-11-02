import Table from "react-bootstrap/Table";
import { BsCheckCircleFill } from "react-icons/bs";
import { BsXCircleFill } from "react-icons/bs";

type resultProps = {
  id: string;
  equation: string;
  answer: number | undefined;
  rightAnswer: number;
};
type resultsProps = {
  id: string;
  equation: string;
  answer: number | undefined;
  rightAnswer: number;
};
export default function DisplayResults({
  results,
}: {
  results: resultProps[];
}) {
  return (
    <Table striped bordered hover className="table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Equations</th>
          <th>Student's Answer</th>
          <th>Right Answer</th>
          <th>Reflection</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result: resultProps, index: number) => (
          <tr key={result.id}>
            <td>{index + 1}</td>
            <td>{result.equation}</td>
            <td>{result.answer}</td>
            <td>{result.rightAnswer}</td>
            <td>
              {result.answer === result.rightAnswer ? (
                <BsCheckCircleFill className="h1 text-success" />
              ) : (
                <BsXCircleFill className="h1 text-danger" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
