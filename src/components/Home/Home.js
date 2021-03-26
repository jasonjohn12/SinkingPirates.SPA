import React from "react";
import { useHistory } from "react-router-dom";
const Home = () => {
  const history = useHistory();
  return (
    <div className="container mt-5">
      <div style={{ textAlign: "center" }}>
        <h1>Find your match</h1>
        <p className="lead">
          Come on in to view your matches... all you need to do is sign up!
        </p>
        <div className="text-center">
          <button
            onClick={() => history.push("/register")}
            className="btn btn-primary btn-lg mr-2"
          >
            Register
          </button>
          <button className="btn btn-info btn-lg">Learn more</button>
        </div>
      </div>
      {/* <div className="container">
        <div className="row justify-content-center">
          <div className="col-4">
            <Register />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
