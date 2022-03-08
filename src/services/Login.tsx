import http from "../Api/http-common";
import LoginData from "../interface/Login";
const Login = (data: LoginData) => {
  return http.post<LoginData>("login", data);
};
const LoginServices = {
  Login,
};
export default LoginServices;
