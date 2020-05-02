import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { Redirect } from "react-router-dom";
import "./style.css";
import { Alert } from "react-bootstrap";
import Akses from "../Data/Akses";
import Profile from "../Form/Profile";

const Home = (props) => {
  const [data, setData] = useState("");
  const [alert, setAlert] = useState(true);
  // const rule = localStorage.getItem("Rule");

  useEffect(() => {
    document.getElementById("title").innerText = "E-Learning";
  }, []);

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Guru");
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
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  }, []);

  const detail = () => {
    props.history.push("/mapel/detail");
  };

  return localStorage.getItem("Token") ? (
    <>
      <Header page="home" logout={logout} />
      <div className="wrapper">
        <Alert
          variant="primary"
          show={alert}
          onClose={() => setAlert(false)}
          dismissible
          className="alert-home"
        >
          Halo <span>{data.nama}</span>
        </Alert>
        <Profile />
        <Akses data={data} click={detail} />
      </div>
    </>
  ) : (
    <Redirect to="/auth" />
  );
};

export default Home;
