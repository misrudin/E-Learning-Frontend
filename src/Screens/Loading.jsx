import React from "react";
import "./Splash.css";

const Loading = () => {
  return (
    <div className="container-loading">
      <div className="loading-area">
        <div className="loader cardloading">
          <div className="inner one" />
          <div className="inner two" />
          <div className="inner three" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
