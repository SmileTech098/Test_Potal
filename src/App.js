import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Finish from "./Components/Finish";
import QuestionPage from "./Components/QuestionPage";
import Questions1 from "./Components/Questions1";
import TestPage from "./Components/TestPage";

function App() {
  return (
    <>
      {/* <Questions1 /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TestPage />}></Route>
          <Route exact path="/TestPage/:id" element={<Questions1 />}></Route>
          <Route exact path="/finish" element={<Finish />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
