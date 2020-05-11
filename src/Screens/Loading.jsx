import React from "react";
import "./Splash.css";
// import LoadingImg from "../Images/6.gif";

const Loading = () => {
  return (
    <div className="container-loading">
      <div className="loading-area">
        <div className="loader">Loading...</div>
        {/* <img src={LoadingImg} alt="Loading" /> */}
      </div>
    </div>
  );
};

export default Loading;
