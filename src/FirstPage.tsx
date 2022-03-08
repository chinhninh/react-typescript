import React, { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { getToken } from "./redux/localStorage";
import { LOGIN_PATH, WORKSPACE_PATH } from "./routers/path";

const FirstPage = () => {
  let navigate = useNavigate();
  const token =
    useSelector<RootState>((state) => state.loginReducer?.token) || getToken();
  let isLogin = token === null ? false : true;
  useEffect(() => {
    if (isLogin) {
      goToHome();
    }
    else {
      navigate(LOGIN_PATH);
    }
  }, [token]);

  const goToHome = () => {
    navigate(WORKSPACE_PATH);
  };
  return <div />;
};

export default FirstPage;
