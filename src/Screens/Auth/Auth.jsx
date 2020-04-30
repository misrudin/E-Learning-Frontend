import React, { useEffect } from "react";
import "./style.css";
import { Redirect } from "react-router-dom";

const Auth = (props) => {
  useEffect(() => {
    document.getElementById("title").innerText = "E-Learning : Auth";
  }, []);

  return !localStorage.getItem("Token") ? (
    <div className="auth">
      <div className="items">
        <div className="item">
          <div
            className="login-auth"
            onClick={() => props.history.push("/admin")}
          >
            <i className="fa fa-user fa-2x link"></i>
            <h1>Admin</h1>
          </div>
        </div>
        <div className="item">
          <div
            className="login-auth"
            onClick={() => props.history.push("/guru")}
          >
            <i className="fa fa-user fa-2x link"></i>
            <h1>Guru</h1>
          </div>
        </div>
        <div className="item">
          <div
            className="login-auth"
            onClick={() => props.history.push("/siswa")}
          >
            <i className="fa fa-user fa-2x link"></i>
            <h1>Siswa</h1>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/home" />
  );
};

export default Auth;
