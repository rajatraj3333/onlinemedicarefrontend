import React, { act, Children, useEffect, useState } from "react";
import { Spin, Alert } from "antd";
import { useSelector } from "react-redux";
function Loader({ children, data }) {
  const state = useSelector((state) => state.user);

  const [delayactive, setdelayactive] = useState(state.loading);

  useEffect(() => {
    setdelayactive(state.loading);
  }, [state.loading]);

  return (
    <>
      {delayactive ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <Spin tip="Loading..."></Spin>
        </div>
      ) : (
        children
      )}
    </>
  );
}

export default Loader;
