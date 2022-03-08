import { LOGIN_START, LOGIN_FAIL, LOGIN_SUCCESS } from "./login.types";

import LoginServices from "../../services/LoginServices";

import LoginData from "../../interface/Login";

import { configError } from "../../props/configError";
import { message } from "antd";

import { setToken, removeToken } from "../localStorage";

const actionLogin = (body: LoginData, goToHome: any) => (dispatch: any) => {
  dispatch({ type: LOGIN_START });
  LoginServices.Login(body)
    .then((res: any) => {
      message.success("Đăng nhập thành công");
      dispatch({ type: LOGIN_SUCCESS, payload: res?.data?.token });
      setToken(res?.data?.token);
      goToHome();
    })
    .catch((e: any) => {
      configError(e?.response);
      dispatch({ type: LOGIN_FAIL, payload: e });
    });
};

const actionLogout = (goToLogin: () => void) => {
  removeToken();
  goToLogin()
};

export { actionLogin, actionLogout };
