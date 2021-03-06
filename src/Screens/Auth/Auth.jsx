import React, { useEffect } from "react";
import "./style.css";
import { Redirect } from "react-router-dom";
import wave from "../../Images/footer-bg.png";
import wave2 from "../../Images/wave.png";
import bg from "../../Images/bg.svg";
import avatar from "../../Images/avatar.svg";

const Auth = (props) => {
  useEffect(() => {
    document.getElementById("title").innerText = "E-Learning : Auth";
  }, []);

  return !localStorage.getItem("Token") ? (
    <>
      <img className="wave" src={wave} alt="wave" />
      <img className="wave" src={wave2} alt="wave" />
      <div className="container-fluid">
        <div className="img">
          <img src={bg} alt="background" />
        </div>
        <div className="login-content">
          <div className="form">
            <div className="auth">
              <div
                className="login-auth"
                onClick={() => props.history.push("/admin")}
              >
                <i className="fa fa-user fa-2x link"></i>
                <h1>Admin</h1>
                <img src={avatar} alt="Admin" />
              </div>
              <div
                className="login-auth"
                onClick={() => props.history.push("/guru")}
              >
                <i className="fa fa-user fa-2x link"></i>
                <h1>Guru</h1>
                <img src={avatar} alt="Admin" />
              </div>
              <div
                className="login-auth"
                onClick={() => props.history.push("/siswa")}
              >
                <i className="fa fa-user fa-2x link"></i>
                <h1>Siswa</h1>
                <img src={avatar} alt="Admin" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/home" />
  );
};

export default Auth;
