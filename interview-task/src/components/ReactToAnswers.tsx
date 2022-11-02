import { BsCheckCircleFill } from "react-icons/bs";
import { BsXCircleFill } from "react-icons/bs";

export default function ReactToAnswers({ correct }: { correct: string }) {
  return correct === "Correct!" ? (
    <p className="position-absolute top-0 end-0 p-3 text-success">
      {correct} <BsCheckCircleFill className="h1 text-success" />
    </p>
  ) : (
    <p className="position-absolute top-0 end-0 p-3 text-danger">
      {correct} <BsXCircleFill className="h1 text-danger" />
    </p>
  );
}
