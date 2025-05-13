import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Components/EmployeeLogin";
const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/auth/adminlogin", values)
      .then((result) => {
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true);
          navigate("/dashboard");
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid  vh-100 d-flex login-page">
      <div className="login-left d-flex flex-column justify-content-between p-2  text-white">
        <h2>Admin</h2>
      <div className="tab-switcher text-center">
      <button
        type="button"
        className="tab"
        onClick={() => navigate("/employee_login")}
      >
        Employee
      </button><br></br>
      <button
        type="button"
        className="tab active"
        onClick={() => navigate("/adminlogin")}
      >
        Admin
      </button>
    </div>
      </div>

      <div className="login-right d-flex flex-column justify-content-center align-items-center w-50">
        <div className="login-form-container text-center">
          <h5 className="text-danger mb-3">{error && error}</h5>
          <form onSubmit={handleSubmit} className="w-100">
            <div className="form-group mb-3 d-flex align-items-center border-bottom">
              <i className="bi bi-person me-2"></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control border-0 shadow-none"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group mb-4 d-flex align-items-center border-bottom">
              <i className="bi bi-lock me-2"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control border-0 shadow-none"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="btn w-100 mb-3"
              style={{
                background:
                  "linear-gradient(to bottom right, #60BFC1, #FDB7B9)",
                color: "#fff",
                border: "none",
              }}
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
