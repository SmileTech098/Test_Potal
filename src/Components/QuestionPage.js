import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// const baseURL = "http://interviewapi.ngminds.com/getQuizData";
const baseURL = "https://dip-kaluse.github.io/examport/portal.json";

let counter = JSON.parse(localStorage.getItem("COUNTER")) || 0;
const response=JSON.parse(localStorage.getItem("RES")) || [];
var len = 0;
let CROption=0
let  WrOption=0;

function QuestionPage() {
  const navigate = useNavigate();
  const [Questions, setQuestions] = useState([]);
  const [Question, setQuestion] = useState("");
  const [QName, setQName] = useState("");
  const [Option, setOption] = useState([]);
  const [SelOption, setSelOption] = useState("");
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
  
  let t=false;
  const FunSelOption = (e, index) => {
    console.log(e.target.checked)

    
    // e.target.checked? type.push(index):type.pop()
    if(e.target.type=="radio")
   { 
     setSelOption(index);
    t=false
   }
    else{
      e.target.checked? type.splice(index,0,index):type.splice(index,1)
      
      
      // setSelOption(type)
      console.log(type)
     t=true;
     console.log(t);
    }
    
  };




  useEffect(() => {
    axiosFun();
  }, [count]);

  const Nexthandler = () => {
    response.push(SelOption)
    localStorage.setItem("RES",JSON.stringify(response))
    const indexop = SelOption; 
    localStorage.setItem("COUNTER", JSON.stringify(count+1));
    console.log(correctOption === indexop || correctOption===type)
    if (indexop !== -1) {
     if( correctOption === indexop || JSON.stringify(correctOption)===JSON.stringify(type))
        {
          CROption++
        console.log("right");
      }
        else
         {
           WrOption++
         console.log("wrong");
        }
    }
counter++;

localStorage.setItem("Ans", JSON.stringify([CROption,WrOption]));
setcount(counter);
    if (count === len - 1) {
      if (window.confirm("Do you want to submit test")) Submit();
      return

    }
  };

const Prevhandle=()=>{
count>=1?setcount(prev=>prev-1):setcount(0)
const res=JSON.parse(localStorage.getItem("RES")) || [];
setSelOption(res[count])
console.log(SelOption)
}

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
                                FunSelOption(e, index)
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
              {/* <button onClick={Prevhandle}  className="btn btn-success mx-3">
                  Prev
                </button> */}
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
