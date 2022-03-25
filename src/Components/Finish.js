import React from "react";

function Finish() {
  return (
    <>
      <div className="container">
        <div className="row">
          <h1>My Interview Portal</h1>
          <hr />
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">AngularJS Test - Result</div>
              <div className="panel-body">
                <center>
                  <h2 className="">Total no of Questions: 10</h2>
                  <h3 className="text-success">
                    Correct Answers: 6
                    <span className="text-danger">Wrong Answers: 4</span>
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
