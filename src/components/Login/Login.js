import React, { useState } from "react";

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-center text-primary">Login</h2>
      <hr />
      <div className="form-group">
        <input
          type="text"
          className="FormControl"
          name="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="FormControl"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <button type="submit" className="btn btn-primary btn-lg mr-2">
        Submit
      </button>
    </form>
  );
};

export default Login;
