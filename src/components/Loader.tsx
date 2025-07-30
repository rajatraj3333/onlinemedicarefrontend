import React, { act, Children, useEffect, useState } from "react";
import { Spin, Alert } from "antd";
import { useSelector } from "react-redux";
import {Users} from '../components/login/hooks/useErrorHooks'
import { RootState } from "../redux/store";
interface Props {
 children: React.ReactNode,
 data?:boolean


}
function Loader({ children }:Props) {
  const state = useSelector((state:RootState) => state.user);

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
