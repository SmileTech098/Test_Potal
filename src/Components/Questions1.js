import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// const baseURL = "http://interviewapi.ngminds.com/getQuizData"; 
const baseURL ="https://dip-kaluse.github.io/examport/portal.json"
let  dataLoc='';
let  corrInd=[];
let  corrRes=[];
const Arrr=JSON.parse(localStorage.getItem("COUNTER"));
console.log(Arrr[0])
// let Arr=[count,right,wrong]
let len
let right=Arrr[1]||0;
let wrong=Arrr[2]||0;

const checkRes=(e)=>{
e.target.checked=true
}

function Questions1() {
  const navigate = useNavigate();
  const [count, setcount] = useState(Arrr[0]||0);
  const [Questions, setQuestions] = useState([]);
  const [QName,setQName]=useState(null)
  const [ID,setID]=useState(null)
  const [Correct,setCorrect]=useState(null)
  const [Res,setRes]=useState(null)


  const { id } = useParams();
  // const id = "598e9256cc88456d444e7c0d";

  let indData

const SelOption=(e,checkedValue)=>{
   indData=parseInt(e.target.value);

if(checkedValue==="radio")
{
  if(dataLoc[0].questions[count].correctOptionIndex===indData)
  {
    setCorrect(true)
    console.log("right")
    corrRes.push(indData);
  }
  else 
  {
    setCorrect(false)
  }

}
else
  {
     e.target.checked?corrInd.push(indData):corrInd.pop()
   
     JSON.stringify(dataLoc[0].questions[count].correctOptionIndex)===JSON.stringify(corrInd)?corrRes.push(corrInd):console.log("jj")
    
    (JSON.stringify(dataLoc[0].questions[count].correctOptionIndex)===JSON.stringify(corrInd))
   ?
      setCorrect(true) 
      :setCorrect(false)
  }
  console.log(Correct)
}

console.log(corrRes)


  const Nexthandler = () => {
    setcount((prev)=>prev+1)
if(Correct)
{
  right++;
}
else if(!Correct)
{
  wrong++;
}
    console.log(Correct)
    let Arr=[count,right,wrong]
    localStorage.setItem("COUNTER", JSON.stringify(Arr));


    if (count === len - 1) {
      if (window.confirm("Do you want to submit test")) Submit();
    }

  };


  const Submit = () => {
    console.log(right+"...."+wrong)
    console.log("submit...")
    const obj = [
      {
        Total: right + wrong,
        Wrong: wrong,
        Correct: right,
        QName: QName,
      },
    ];
    localStorage.setItem("COUNTER", JSON.stringify(0));
    localStorage.setItem("Right", JSON.stringify(obj))
    navigate("/finish", { state: obj });
  };
  useEffect(() => {
    axios.get(baseURL).then((response) => {
       dataLoc = response.data.tests.filter((ele) => ele._id === id);
      localStorage.setItem("TEST", JSON.stringify(dataLoc));
      setQuestions(dataLoc[0].questions);
      setQName(dataLoc[0].name)
      setID(dataLoc[0].questions[count]._id)
      // console.log(dataLoc[0].questions[count]._id)
      // console.log(dataLoc[0].questions[count].correctOptionIndex)
 len=dataLoc[0].questions.length
    });
    

return () => {
 
}
  }, [count]);



  return (
    <>
      <div className="container">
        <div className="row">
          <h1>My Interview Portal</h1>
          <hr />
          <div className="col-md-12">
            <div className="panel panel-default">
             <div className="panel-heading">{QName}</div>
              {
               Questions.filter((ele) => ele._id === ID)
               .map((ele1)=>(
                <div className="panel-body" key={ele1}>
                  <form>
                    <label>{ele1.questionText}</label>
                    {
                    ele1.options.map((ele, index) => {
                      const checked=ele1.type==="Multiple-Response"?"checkbox":"radio"
                      return(
                        <div className="radio" key={ele}>
                        <label>
                            <input
                              type={checked}
                              name={`option`}
                              value={index} 
                              onChange={(e) => SelOption(e,checked)}  
                            />{"   "}
                            {ele}
                          
                        </label>
                      </div>
                      )
                     
})}
                  </form>
                </div>
            ))
                
              }
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

export default Questions1;
