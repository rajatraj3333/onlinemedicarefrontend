import React, { useState, useEffect } from "react";
import { Outlet, useSearchParams } from "react-router";
import "../css/auth.css";
import {
  DownOutlined,
  DropboxCircleFilled,
  SettingOutlined,
} from "@ant-design/icons";

import { Button, Dropdown, Space } from "antd";
import {

  RiCloseFill,

  RiMenuLine,
} from "@remixicon/react";
import { Avatar, Menu, notification } from "antd";
import { Link } from "react-router";
import { UserOutlined } from "@ant-design/icons";

import permission from "../../utils/permission";
import { removeDetails, setloginDetails } from "../../redux/slice/userSlice";

import { useHooks } from "../../utils/hooks";
import { RootState } from "../../redux/store";

import { sessionout } from "./logout";
import { useSelector } from "react-redux";
import ListDoctor from './ListDoctor'


function Authlayout() {

  const [menuOpen, setmenuOpen] = useState(false);
  const isLogin = true;

  const userdetails = useSelector((state: RootState) => state.user);
  const { dispatch, navigate } = useHooks();

  const { roles } = userdetails;





  useEffect(() => {
    dispatch(setloginDetails({
      email: localStorage.getItem("email") || "",
      token: localStorage.getItem("token") || "",
      roles: localStorage.getItem("roles") || "",
    }))
  }, [])


  const logout = () => {

    sessionout(dispatch, navigate);
  }

  return (
    <div style={{}}>
      <div className="nav_bar">
        <div className="authlogo">
          {menuOpen ? (
            <RiCloseFill onClick={(e) => setmenuOpen(!menuOpen)} />
          ) : (
            <RiMenuLine onClick={(e) => setmenuOpen(!menuOpen)} />
          )}
        </div>

        {isLogin && (
          <div className="dropdown">
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="0" className="menus">
                    <Link to={"/profile"} className="Authlinks">Profile</Link>
                  </Menu.Item>
                  <Menu.Item key="1" onClick={logout} className="menus">
                    <Link to={''} className="Authlinks"> Logout</Link>
                  </Menu.Item>
                </Menu>
              }
            >
              <a>
                <Space>
                  <Avatar size={48} icon={<UserOutlined />} />
                  {/* <DownOutlined /> */}
                </Space>
              </a>
            </Dropdown>
          </div>
        )}
        {!isLogin && <button className="loginbtn">Login</button>}
      </div>
      {<Outlet />}
      {menuOpen && (
        <div className={menuOpen ? "sub-menu" : "sub-menu-close"}>
          <div className="menu-item">
            <ul>
              <ListDoctor roles={userdetails.roles} />
            </ul>

            {roles === "Patient" && (
              <ul>
                <li>
                  <Link
                    to={"/bookings"}
                    style={{ textDecoration: "none" }}
                    className="Authlinks"
                  >
                    book
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Authlayout;
