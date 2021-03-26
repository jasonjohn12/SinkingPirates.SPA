import React from "react";

const Register = () => {
  return (
    <form>
      <h2 className="text-center text-primary">Sign Up</h2>
      <hr />
      <div className="form-group">
        <input
          type="text"
          className="FormControl"
          name="username"
          placeholder="Username"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="FormControl"
          name="password"
          placeholder="Password"
        />
      </div>
    </form>
  );
};

export default Register;
