import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../redux/actions/auth";
import "./style.css";
import { Redirect } from "react-router-dom";
import Loading from "../Loading";
import wave from "../../Images/wave.png";
import bg from "../../Images/bg.svg";
import avatar from "../../Images/avatar.svg";

const LoginAdmin = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("misrudinz@gmail.com");
  const [password, setPassword] = useState("123");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const validEmail = (data) => {
    // eslint-disable-next-line
    let Regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return Regex.test(data);
  };

  const validPassword = (data) => {
    // eslint-disable-next-line
    let Regex = /^[A-Za-z\d]{3,}$/;
    return Regex.test(data);
  };

  const parseJwt = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    const decoded = JSON.parse(jsonPayload);
    return decoded.rule;
  };

  const login = async () => {
    setLoading(true);
    const data = { email, password };
    if (!validEmail(email)) {
      setMsg("Format Email Tidak Valid!");
    } else if (!validPassword(password)) {
      setMsg("Input Password Minimal 3 Karakter!");
    } else {
      await dispatch(loginAdmin(data)).then((res) => {
        const result = res.value.data.result;
        if (result.msg) {
          setMsg(result.msg);
          setLoading(false);
        } else {
          const rule = parseJwt(result.token);
          localStorage.setItem("Token", result.token);
          localStorage.setItem("Rule", rule);
          setLoading(false);
        }
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    document.getElementById("title").innerText = "Admin";
  }, []);

  return !localStorage.getItem("Token") ? (
    <>
      {loading ? <Loading /> : null}
      <img className="wave" src={wave} alt="wave" />
      <div className="container-fluid">
        <div className="img">
          <img src={bg} alt="background" />
        </div>
        <div className="login-content">
          <div className="form">
            <p className="text-danger">{msg}</p>
            <img src={avatar} alt="avatar user" />
            <h2 className="title">Welcome</h2>
            <div className={email ? "input-div one focus" : "input-div one"}>
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Email</h5>
                <input
                  type="email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
            <div
              className={password ? "input-div pass focus" : "input-div pass"}
            >
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <h5>Password</h5>
                <input
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => (e.key === "Enter" ? login() : null)}
                />
              </div>
            </div>
            <p className="forgot">Forgot Password?</p>
            <button type="button" className="btn2" onClick={login}>
              Masuk
            </button>
            <button
              className="btn2 btn-danger btn-block buton-dgr"
              onClick={() => props.history.push("/auth")}
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/home" />
  );
};

export default LoginAdmin;
