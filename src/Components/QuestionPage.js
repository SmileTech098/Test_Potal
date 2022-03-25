import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
const baseURL = "http://interviewapi.ngminds.com/getQuizData";

function QuestionPage() {
  const [Questions, setQuestions] = useState([]);
  const [Question, setQuestion] = useState("");
  const [QName, setQName] = useState("");
  const [Option, setOption] = useState([]);
  const [SelOption, setSelOption] = useState(null);
  const [CROption, setCROption] = useState(0);
  const [WrOption, setWrOption] = useState(0);
  const [correctOption, setcorrectOption] = useState(null);
  const [count, setcount] = useState(0);
  const { id } = useParams();

  const axiosFun = () => {
    axios.get(baseURL).then((response) => {
      const dataLoc = response.data.tests.filter((ele) => ele._id === id);
      localStorage.setItem("TEST", JSON.stringify(dataLoc));
      setQName(dataLoc[0].name);
      setQuestions(dataLoc[0].questions);
      setQuestion(dataLoc[0].questions[count].questionText);
      setOption(dataLoc[0].questions[count].options);
      setcorrectOption(dataLoc[0].questions[count].correctOptionIndex);

      //   console.log(dataLoc[0].questions[count].options);
    });
  };

  useEffect(() => {
    axiosFun();
  }, []);

  const Nexthandler = () => {
    setcount((prev) => prev + 1);
    const indexop = Option.indexOf(SelOption);
    console.log(typeof correctOption);
    console.log(correctOption === indexop);
    console.log(correctOption + "-------" + indexop);
    console.log(SelOption);
    console.log(Option);

    correctOption === indexop
      ? setCROption((prev) => prev + 1)
      : setWrOption((prev) => prev + 1);

    if (count === 5) {
      if (window.confirm("Do you want to submit test")) Submit();
      return;
    }
    axiosFun();
  };

  const Submit = () => {
    console.log("submitted...");
    const obj = [
      {
        Total: WrOption + CROption,
        Wrong: WrOption,
        Correct: CROption,
      },
    ];
    localStorage.setItem("Right", JSON.stringify(obj));

    console.log("correct  " + CROption);
    console.log("wrong  " + WrOption);
  };

  //   const handleChange = (value) => {};

  return (
    <>
      <div className="container">
        <div className="row">
          <h1>My Interview Portal</h1>
          <hr />
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">{QName}</div>

              <div className="panel-body">
                <form>
                  <label>{Question}</label>

                  {Option.map((ele, index) => (
                    <div className="radio" key={index}>
                      <label>
                        <h5>
                          <input
                            type="radio"
                            name={`option`}
                            value={ele}
                            onChange={(e) => setSelOption(e.target.value)}
                          />
                          {ele}
                        </h5>
                      </label>
                    </div>
                  ))}
                </form>
              </div>

              <div className="panel-footer">
                <button onClick={Nexthandler} className="btn btn-success">
                  Next
                </button>
                <Link to="/finish">
                  <button
                    onClick={Submit}
                    className="pull-right btn btn-danger"
                  >
                    Finish
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuestionPage;
