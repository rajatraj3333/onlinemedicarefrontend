import React, { useState, useEffect } from "react";
import { Outlet, useSearchParams } from "react-router";
import "./css/auth.css";
import {
  DownOutlined,
  DropboxCircleFilled,
  SettingOutlined,
} from "@ant-design/icons";

import { Button, Dropdown, Space } from "antd";
import {
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiCloseFill,
  RiDropdownList,
  RiDropFill,
  RiMenuLine,
} from "@remixicon/react";
import { Avatar, Menu, notification } from "antd";
import { Link } from "react-router";
import { UserOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { useNavigate } from "react-router";
import permission from "../utils/permission";
import { useDispatch, useSelector } from "react-redux";
import { removeDetails } from "../redux/slice/userSlice";
import api from "../utils/api";

function Lidoctor({roles}) {
  const [managedropdown, setmanagedropdown] = useState(false);

  return (
    <>
      {permission.dashboard.includes(roles) && (
        <li>
          <Link to={"admin/"} style={{ textDecoration: "none", color: "#333" }}>
            Dashboard{" "}
          </Link>
        </li>
      )}
      {permission.doctor.includes(roles) && (
        <li>
          <Link
            to={"admin/doctor"}
            style={{ textDecoration: "none", color: "#333" }}
          >
            Doctor{" "}
          </Link>
        </li>
      )}

      {permission.emailsetting.includes(roles) && <li>Email Setting</li>}

      {permission.bookinghistory.includes(roles) && (
        <li>
          {" "}
          <Link to={"admin/"} style={{ textDecoration: "none", color: "#333" }}>
            booking history{" "}
          </Link>
        </li>
      )}
      {permission.emailsetting.includes(roles) && (
        <li>
          <Link
            to={"admin/setting"}
            style={{ textDecoration: "none", color: "#333" }}
          >
            Setting
          </Link>
        </li>
      )}
      {permission.management.includes(roles) && (
        <li onClick={() => setmanagedropdown(!managedropdown)}>
          Management{" "}
          {managedropdown ? (
            <RiArrowDropUpLine />
          ) : (
            <RiArrowDropDownLine style={{ marginTop: "0px" }} />
          )}
          <ul
            style={managedropdown ? { display: "block" } : { display: "none" }}
          >
             <Link
            to={"admin/default"}
            style={{ textDecoration: "none", color: "#333" }}
          >
            Default
          </Link>
            {/* <li>Daily</li> */}
          </ul>
        </li>
      )}
    </>
  );
}
// function LiAssociatedoctor(){
//   return (
// <></>
//   )
// }

// function LiAssociate(){
//   return (
// <></>
//   )
// }

function Authlayout() {
  
  const [menuOpen, setmenuOpen] = useState(false);
  const isLogin = true;
  const navigate = useNavigate();
  const userdetails = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const {roles}=userdetails;



  const items = [
    {
      key: "1",
      label: "My Account",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Profile",
      extra: "⌘P",
    },
    {
      key: "3",
      label: "Billing",
      extra: "⌘B",
    },
    {
      key: "4",
      label: "Settings",
      icon: <SettingOutlined />,
      extra: "⌘S",
    },
  ];
  const logout = (e) => {
    localStorage.clear();
    dispatch(removeDetails());
    
    api.get("/auth/logout").then((res) => {
      if (res.status === 200) {
        notification.success({
          message: res.data.response || "Logout successful",
        });
        navigate("/login");
      } else {
        notification.error({
          message: res.data.error || "Logout failed",
        });
      }
    }).catch((error) => {
      notification.error({
        message:  error.message || "An error occurred during logout",
      });
    });
  };

  return (
    <div>
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
                  <Menu.Item key="0">
                    <Link to={"/profile"}>Profile</Link>
                  </Menu.Item>
                  <Menu.Item key="1" onClick={logout}>
                    Logout
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
              <Lidoctor roles={userdetails.roles}/>
            </ul>

            {roles === "Patient" && (
              <ul>
                <li>
                  <Link
                    to={"/bookings"}
                    style={{ textDecoration: "none", color: "#333" }}
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
