import React, { useEffect } from "react";
import "./Splash.css";
import { useDispatch } from "react-redux";
import { saveToken } from "../redux/actions/auth";

const Splash = (props) => {
  const dispatch = useDispatch();

  const cekToken = () => {
    setTimeout(() => {
      if (localStorage.getItem("Token")) {
        dispatch(saveToken(localStorage.getItem("Token")));
        props.history.push("/home");
      } else {
        props.history.push("/auth");
      }
    }, 2000);
  };

  useEffect(() => {
    cekToken();
  });

  useEffect(() => {
    document.getElementById("title").innerText = "E-Learning";
  }, []);

  return (
    <div className="container-fluid splash">
      <div className="anim">
        <div className="anim-item"></div>
      </div>
    </div>
  );
};

export default Splash;