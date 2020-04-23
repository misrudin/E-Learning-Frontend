import React, { useEffect } from "react";
import "./style.css";
import Header from "../../Components/Header";
import { Redirect } from "react-router-dom";

const ListMapel = (props) => {
  useEffect(() => {
    document.getElementById("title").innerText = "List Mata Pelajaran";
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
        <div
          className="item-mapel mb-3"
          onClick={() => props.history.push("mapel/detail")}
        >
          <div className="judul">
            <h3 className="mr-1">1.</h3>
            <h3>Matematika</h3>
          </div>
          <div className="detail ml-2">
            <p className="text-primary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              voluptate rerum quos in voluptates! Accusamus eius eveniet at
              veritatis tempora.
            </p>
          </div>
          <button className="btn btn-primary buton m-1 px-5">Buka</button>
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/auth" />
  );
};

export default ListMapel;
