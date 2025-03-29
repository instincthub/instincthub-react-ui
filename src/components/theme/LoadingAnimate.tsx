import React from "react";

export default function LoadingAnimate() {
  return (
    <div className="react_loading container">
      <div>
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
