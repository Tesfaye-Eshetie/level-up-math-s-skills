import { BsCheckCircleFill } from "react-icons/bs";
import { BsXCircleFill } from "react-icons/bs";

export default function ReactToAnswers({ isCorrect }: { isCorrect: string }) {
  return isCorrect === "Correct!" ? (
    <p className="position-absolute top-0 end-0 p-3 text-success">
      {isCorrect} <BsCheckCircleFill className="h1 text-success" />
    </p>
  ) : (
    <p className="position-absolute top-0 end-0 p-3 text-danger">
      {isCorrect} <BsXCircleFill className="h1 text-danger" />
    </p>
  );
}
