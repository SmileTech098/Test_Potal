import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Finish() {
  const { state } = useLocation();
  const navigate = useNavigate();
  // const [All, setAll] = useState(state[0]);
  const { Total, Wrong, Correct, QName } = state[0];
  console.log(Total);
  console.log(state[0].QName);
  useEffect(() => {
    return () => {
      navigate("/");
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <h1>My Interview Portal</h1>
          <hr />
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">{QName} - Result</div>

              <div className="panel-body">
                <center>
                  <h2 className="">Total no of Questions: {Total}</h2>
                  <h3 className="text-info">
                    {" "}
                    Total Attempt :-{Correct + Wrong}
                  </h3>
                  <h3 className="text-success">
                    Correct Answers: {Correct}
                    {"  "}
                    <span className="text-danger">Wrong Answers: {Wrong}</span>
                  </h3>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Finish;
