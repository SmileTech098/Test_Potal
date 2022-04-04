import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const baseURL ="https://dip-kaluse.github.io/examport/portal.json"
let  dataLoc='';
let ResArr=[];
let  corrInd=[];
let  corrRes=[];
let len


function Questions1() {
  const navigate = useNavigate();
  const { id } = useParams();
  // let id = "598e9256cc88456d444e7c0d";
  const Arrr=JSON.parse(localStorage.getItem(id))||0;
  const [Questions, setQuestions] = useState([]);
  const [QName,setQName]=useState(null)
  const [ID,setID]=useState(null)
  const [Correct,setCorrect]=useState(null)
  const [count, setcount] = useState(Arrr);
  localStorage.setItem(id,JSON.stringify(count));
  let indData

  const checkRes=(ind)=>{
  console.log("-------------------------"+ind);
  }

const SelOption=(e,checkedValue)=>{
   indData=parseInt(e.target.value);

ResArr=JSON.parse(localStorage.getItem(`RES${id}`))||[];

if(checkedValue==="radio")
{
  ResArr[count]=indData
  // if(dataLoc[0].questions[count].correctOptionIndex===indData)
  // {
  //   setCorrect(true)
  //   console.log("right")
  //   corrRes.push(indData);
  // }
}
else
  {
     e.target.checked?corrInd.push(indData):corrInd.pop()
     ResArr[count]=corrInd
     indData=corrInd;
  //    JSON.stringify(dataLoc[0].questions[count].correctOptionIndex)===JSON.stringify(corrInd)?corrRes.push(corrInd):console.log(null);
  //   (JSON.stringify(dataLoc[0].questions[count].correctOptionIndex)===JSON.stringify(corrInd))
  //  ?
  //     setCorrect(true) 
  //     :setCorrect(false)
  }
  console.log(ResArr)
  localStorage.setItem(`RES${id}`,JSON.stringify(ResArr))
  checkRes(indData); 
}
  const Nexthandler = () => {
    if(count<len-1) setcount((prev)=>prev+1)

if (count === len - 1) 
 { if (window.confirm("Do you want to submit test")) Submit();}


  };

 const  Prevhandler = () => {
  if(count>0)
  { setcount((prev)=>prev-1)}
   
     };
  const Submit = () => {
    let right=0;
    let wrong=0;
    const resanwser=JSON.parse(localStorage.getItem(`RES${id}`))||[];
        resanwser.map((ele,index)=>{
          console.log(JSON.stringify(dataLoc[0].questions[index].correctOptionIndex)+"==="+JSON.stringify(ele))
          // console.log(JSON.stringify(ele)==null)
        
          if(JSON.stringify(dataLoc[0].questions[index].correctOptionIndex)===JSON.stringify(ele)||dataLoc[0].questions[index].correctOptionIndex===ele)
          {
            right++;
          console.log("first"+ele)
          }
          else if(ele==null)
          {
            console.log(null)
          }
          else
          wrong++
         }
        )

    console.log(right+"...."+wrong)
    const obj = [
      {
        Total: len,
        Wrong: wrong,
        Correct: right,
        QName: QName,
      },
    ];

      console.log(obj[0])
      localStorage.setItem(`RES${id}`,JSON.stringify([]))
      localStorage.setItem(id,JSON.stringify(0));
      navigate("/finish", { state: obj });
  };


 const checkHandle=(index)=>{
  const ch =JSON.parse(localStorage.getItem(`RES${id}`))||[]
   if(index===ch[count] && index!=null )
   return true 
 }

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
                              checked={checkHandle(index)}
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
                <button onClick={Prevhandler} className="btn btn-success mx-3">
                    prev
                  </button>



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
