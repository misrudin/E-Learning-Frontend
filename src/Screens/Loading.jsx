import React from "react";
import "./Splash.css";

const Loading = () => {
  return (
    <div className="container-loading">
      <div className="loading-area">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;