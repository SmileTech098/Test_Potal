import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const baseURL = "http://interviewapi.ngminds.com/getQuizData";
// const baseURL = "https://dip-kaluse.github.io/examport/portal.json";

let counter = JSON.parse(localStorage.getItem("COUNTER")) || 0;
var len = 0;

function QuestionPage() {
  const navigate = useNavigate();

  const [Questions, setQuestions] = useState([]);
  const [Question, setQuestion] = useState("");
  const [QName, setQName] = useState("");
  const [Option, setOption] = useState([]);
  const [SelOption, setSelOption] = useState(null);
  const [CROption, setCROption] = useState(0);
  const [WrOption, setWrOption] = useState(0);
  const [correctOption, setcorrectOption] = useState(null);
  const [count, setcount] = useState(counter);
  const { id } = useParams();

  let type = [];
  const axiosFun = () => {
    axios.get(baseURL).then((response) => {
      const dataLoc = response.data.tests.filter((ele) => ele._id === id);
      localStorage.setItem("TEST", JSON.stringify(dataLoc));
      setQName(dataLoc[0].name);
      setQuestions(dataLoc[0].questions);
      setQuestion(dataLoc[0].questions[count].questionText);
      setOption(dataLoc[0].questions[count].options);
      setcorrectOption(dataLoc[0].questions[count].correctOptionIndex);
      len = dataLoc[0].questions.length;
    });
  };
  const FunSelOption = (e, index) => {
    // console.log("eee" + e);
    type.push(index);
    setSelOption(index);
    console.log(SelOption);
  };
  useEffect(() => {
    axiosFun();
  }, [count]);

  const Nexthandler = () => {
    setcount((prev) => prev + 1);
    const indexop = SelOption;
    localStorage.setItem("COUNTER", JSON.stringify(count));
    if (indexop !== -1) {
      correctOption === indexop
        ? setCROption((prev) => prev + 1)
        : setWrOption((prev) => prev + 1);
    }

    if (count === len - 1) {
      if (window.confirm("Do you want to submit test")) Submit();
    }
  };

  const Submit = () => {
    console.log("submitted...");
    const obj = [
      {
        Total: WrOption + CROption,
        Wrong: WrOption,
        Correct: CROption,
        QName: QName,
      },
    ];
    localStorage.setItem("COUNTER", JSON.stringify(0));
    localStorage.setItem("Right", JSON.stringify(obj));

    console.log("correct  " + CROption);
    console.log("wrong  " + WrOption);
    navigate("/finish", { state: obj });
  };

  console.log("..................." + type);
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

                  {Option.map((ele, index) => {
                    let checkedbox = "radio";
                    Questions[count].type === "Multiple-Response"
                      ? (checkedbox = "checkbox")
                      : (checkedbox = "radio");

                    return (
                      <div className="radio" key={ele}>
                        <label>
                          <h5>
                            <input
                              type={checkedbox}
                              name={`option`}
                              id={ele}
                              value={ele}
                              onChange={(e) =>
                                FunSelOption(e.target.value, index)
                              }
                            />
                            {ele}
                          </h5>
                        </label>
                      </div>
                    );
                  })}
                </form>
              </div>

              <div className="panel-footer">
                <button onClick={Nexthandler} className="btn btn-success">
                  Next
                </button>
                {/* <Link to="/finish"> */}
                <button onClick={Submit} className="pull-right btn btn-danger">
                  Finish
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuestionPage;
