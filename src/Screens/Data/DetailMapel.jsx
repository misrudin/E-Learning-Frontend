import React, { useEffect } from "react";
import Header from "../../Components/Header";
import { Redirect } from "react-router-dom";

const DetailMapel = (props) => {
  useEffect(() => {
    document.getElementById("title").innerText = "Matematika";
  }, []);

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Guru");
    props.history.push("/");
  };

  return localStorage.getItem("Token") ? (
    <>
      <Header page="list-mapel" logout={logout} />
      <div className="wrapper">
        <h2>Detail Mapel</h2>
      </div>
    </>
  ) : (
    <Redirect to="/auth" />
  );
};

export default DetailMapel;
