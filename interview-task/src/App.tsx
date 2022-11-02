import Container from "react-bootstrap/Container";
import AnswerForm from "./components/AnswerForm";
import Header from "./components/Header";

import "./App.css";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Container fluid="md" style={{ minHeight: "80vh" }}>
        <AnswerForm />
      </Container>
      <Footer />
    </>
  );
}

export default App;
