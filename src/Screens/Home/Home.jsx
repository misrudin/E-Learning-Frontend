import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { Redirect } from "react-router-dom";
import "./style.css";
import { Alert } from "react-bootstrap";
import Akses from "../Data/Akses";
import Admin from "../Data/Admin";
import Profile from "../Form/Profile";
import Load from "../Form/Load";

const Home = (props) => {
  const [data, setData] = useState("");
  const [alert, setAlert] = useState("");
  const rule = localStorage.getItem("Rule");

  useEffect(() => {
    document.getElementById("title").innerText = "E-Learning";
    setAlert("Halo " + parseJwt(localStorage.getItem("Token")).nama);
  }, []);

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Rule");
    props.history.push("/");
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
    return decoded;
  };

  useEffect(() => {
    setData(parseJwt(localStorage.getItem("Token")));
    setInterval(() => {
      setAlert("Selamat datang di aplikasi E Learning!");
    }, 10000);
  }, [alert]);

  const detail = () => {
    props.history.push("/mapel/detail");
  };

  return localStorage.getItem("Token") ? (
    <>
      <Header page="home" logout={logout} />
      <div className="wrapper">
        <Alert variant="primary" show={true} className="alert-home">
          {alert}
        </Alert>
        <Profile />
        <Akses data={data} click={detail} />
        {rule === "admin" ? <Load /> : null}
        {rule === "admin" ? (
          <Admin id={parseJwt(localStorage.getItem("Token")).id} />
        ) : null}
        <div className="footer">
          <p className="footer-text">
            Copyright &copy; {new Date().getFullYear()}
            {". E-Learning"}
          </p>
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/auth" />
  );
};

export default Home;
