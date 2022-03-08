import React, { useState } from "react";

import { Layout } from "antd";

import { useNavigate } from "react-router-dom";

import { actionLogout } from "../../../redux/Login/login.actions";

import "./styles.scss";

import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import Logo from '../../../static/images/logo.png'

const { Header } = Layout;

interface propsHeader {
  collapsed: boolean,
  toggle: () => void
}

const HeaderLayout = ({collapsed, toggle}: propsHeader) => {
  const navigate = useNavigate();

  return (
    <Header className="header container-header">
      <div className="logo" >
        <img src={Logo}/>
        </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="button-collap" >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => toggle(),
            }
          )}
        </div>
        <div />
        <div
          style={{ cursor: "pointer" }}
          onClick={() => actionLogout(() => navigate("login"))}
        >
          logout
        </div>
      </div>
    </Header>
  );
};

export default HeaderLayout;
