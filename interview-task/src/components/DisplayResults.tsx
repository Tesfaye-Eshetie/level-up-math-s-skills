import Table from "react-bootstrap/Table";
import { BsCheckCircleFill } from "react-icons/bs";
import { BsXCircleFill } from "react-icons/bs";

type resultProps = {
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
  let totalResults = 0;
  let index = 0;

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
        {results.map((result: resultProps) => (
          <tr key={result.id}>
            <td>{(index += 1)}</td>
            <td>{result.equation}</td>
            <td>{result.answer}</td>
            <td>{result.rightAnswer.toFixed(2)}</td>
            <td>
              {result.answer?.toFixed(2) === result.rightAnswer.toFixed(2) ? (
                <BsCheckCircleFill
                  className="h1 text-success"
                  key={totalResults++}
                />
              ) : (
                <BsXCircleFill className="h1 text-danger" />
              )}
            </td>
          </tr>
        ))}
        {(totalResults / index) * 100 >= 50 ? (
          <tr className="text-center text-success">
            <th colSpan={2}>Total Results</th>
            <th>
              {totalResults}/{index}
            </th>
            <th>{((totalResults / index) * 100).toFixed(2) + "%"}</th>
            <th>Great Job!</th>
          </tr>
        ) : (
          <tr className="text-center text-danger">
            <th colSpan={2}>Total Results</th>
            <th>
              {totalResults}/{index}
            </th>
            <th>{((totalResults / index) * 100).toFixed(2) + "%"}</th>
            <th>Try to do better.</th>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
