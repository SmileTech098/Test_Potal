import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Finish from "./Components/Finish";
import QuestionPage from "./Components/QuestionPage";
import TestPage from "./Components/TestPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TestPage />}></Route>
          <Route exact path="/TestPage/:id" element={<QuestionPage />}></Route>
          <Route exact path="/finish" element={<Finish />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
