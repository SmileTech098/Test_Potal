import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const baseURL = "http://interviewapi.ngminds.com/getQuizData";

function Questions1() {
  const [count, setcount] = useState(0);
  const [Questions, setQuestions] = useState({});

  // const { id } = useParams();
  const id = "598e9256cc88456d444e7c0d";
  const Nexthandler = () => {};
  const Submit = () => {};

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      const dataLoc = response.data.tests.filter((ele) => ele._id === id);
      // localStorage.setItem("TEST", JSON.stringify(dataLoc));
      setQuestions(dataLoc[0].questions);

      // console.log(dataLoc[0].questions);
      // console.log(dataLoc[0]);
      console.log(Questions);
    });
  }, []);

  console.log(Questions);

  return (
    <>
      <div className="container">
        <div className="row">
          <h1>My Interview Portal</h1>
          <hr />
          <div className="col-md-12">
            <div className="panel panel-default">
              {
                Questions.map((ele) => {
                  console.log(ele);
                })
                // Questions[0].map((element, index) => {
                //   console.log("...." + element);
                // })
                // <div className="panel-heading">{`QName`}</div>
                // <div className="panel-body">
                //   <form>
                //     <label>{`Question`}</label>
                //     {Option.map((ele, index) => (
                //       <div className="radio" key={index}>
                //         <label>
                //           <h5>
                //             <input
                //               type="radio"
                //               name={`option`}
                //               value={ele}
                //               //   onChange={(e) => setSelOption(e.target.value)}
                //             />
                //             {ele}
                //           </h5>
                //         </label>
                //       </div>
                //     ))}
                //   </form>
                // </div>
                // <div className="panel-footer">
                //   <button onClick={Nexthandler} className="btn btn-success">
                //     Next
                //   </button>
                //   {/* <Link to="/finish"> */}
                //   <button onClick={Submit} className="pull-right btn btn-danger">
                //     Finish
                //   </button>
                //   {/* </Link> */}
                // </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Questions1;
