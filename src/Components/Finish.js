import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Finish() {
  const { state } = useLocation();
  // const [All, setAll] = useState(state[0]);
  const { Total, Wrong, Correct, QName } = state[0];
  console.log(Total);
  console.log(state[0].QName);

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
