import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { Redirect } from "react-router-dom";

const Home = (props) => {
  console.log(localStorage.getItem("Token"));

  useEffect(() => {
    document.getElementById("title").innerText = "E-Learning";
  }, []);

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Guru");
    props.history.push("/");
  };

  return localStorage.getItem("Token") ? (
    <>
      <Header page="home" logout={logout} />
      <div className="wrapper">
        <h1>SELAMAT DATANG SIAPA ?</h1>
      </div>
    </>
  ) : (
    <Redirect to="/auth" />
  );
};

export default Home;
