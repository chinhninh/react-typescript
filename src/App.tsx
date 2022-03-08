import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import "./App.scss";

import Login from "./container/Login";

import { getToken } from "./redux/localStorage";
import { RootState } from "./redux/store";
import FirstPge from "./FirstPage";
import { Layout } from "antd";
import HeaderLayout from "./container/Layout/Header/Header";
import MenuLayout from "./container/Layout/Menu";
import { arrRouter } from "./routers/routers";
import { LOGIN_PATH } from "./routers/path";

const { Content } = Layout;

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [token, setToken] = useState(useSelector<RootState>((state) => state.loginReducer?.token))
  const tokenLocal = getToken()
  let isLogin = token ? true : false;

  const [collapsed, setCollapsed] = useState(false)
  useEffect(() => {
    setToken(tokenLocal)
  }, [location]);
  useEffect(() => {
    if(!tokenLocal){
      navigate(LOGIN_PATH)
    }
  }, [tokenLocal]);

  let toggle = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <Layout className="App">
      {isLogin && (
        <div>
          <HeaderLayout collapsed={collapsed} toggle={toggle}/>
          <Layout className="container-body">
            <MenuLayout arrRouter={arrRouter} collapsed={collapsed} />

            <Layout style={{ padding: "24px" }}>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                <Routes>
                  <Route path="/" element={<FirstPge />} />
                  {(arrRouter || []).map((e) => {
                    return e.subMenu.length ? (
                      e.subMenu.map((k) => (
                        <Route path={k.path} element={k.page} key={k.key} />
                      ))
                    ) : (
                      <Route path={e.path} element={e.page} key={e.key} />
                    );
                  })}
                  <Route path="*" element={<div>404 page not found</div>} />
                </Routes>
              </Content>
            </Layout>
          </Layout>
        </div>
      )}
      {!isLogin && (
        <div>
          <Routes>
            <Route path={LOGIN_PATH} element={<Login />} />
          </Routes>
        </div>
      )}
    </Layout>
  );
}

export default App;
