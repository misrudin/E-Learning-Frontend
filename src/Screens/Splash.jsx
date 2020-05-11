import React, { useEffect } from "react";
import "./Splash.css";
import { useDispatch } from "react-redux";
import { saveToken } from "../redux/actions/auth";
import LoadingImg from "../Images/8.gif";

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
    }, 1500);
  };

  useEffect(() => {
    cekToken();
  });

  useEffect(() => {
    document.getElementById("title").innerText = "E-Learning";
  }, []);

  return (
    <div className="container-fluid splash">
      {/* <div className="loader-slash cardloading">
        <div className="inner one" />
        <div className="inner two" />
        <div className="inner three" />
      </div> */}
      <img src={LoadingImg} alt="Loading" />
    </div>
  );
};

export default Splash;
