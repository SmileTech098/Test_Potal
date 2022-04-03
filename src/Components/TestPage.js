import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// const baseURL = "http://interviewapi.ngminds.com/getQuizData";
const baseURL = "https://dip-kaluse.github.io/examport/portal.json";
function TestPage() {
  const [Test, setTest] = useState([]);

  const axiosFun = () => {
    axios.get(baseURL).then((response) => {
      response.status === 200
        ? setTest(response.data.tests)
        : console.log("data not found");
    });
  };

  useEffect(() => {
    axiosFun();
  }, [Test]);
  localStorage.setItem("COUNTER", JSON.stringify(0));
  return (
    <>
      <div className="container">
        <div className="row">
          <h1>My Interview Portal</h1>
          <hr />
          <div className="col-md-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Test</th>
                  <th>No of Questions</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {Test.map((ele, index) => (
                  <tr key={index}>
                    <td>{ele.name}</td>
                    <td>{ele.questions.length}</td>
                    <td>
                      <Link to={`/TestPage/${ele._id}`}>
                        <button className="btn btn-warning">Start Test</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TestPage;
