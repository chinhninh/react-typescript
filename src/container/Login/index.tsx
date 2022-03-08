import { Form, Input, Button } from "antd";

import { useDispatch, useSelector } from "react-redux";

import { actionLogin } from "../../redux/Login/login.actions";
import { RootState } from "../../redux/store";
import { requiredItem, max6, validateEmail } from "../../props/validation";
import './styles.scss'
import {  useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const loading = useSelector<RootState>(
    (state) => state.loginReducer?.loading
  );

  const onFinish = (values: any) => {
    let body = {
      email: values.email,
      password: values.password,
    };
    dispatch(actionLogin(body, () => goToHome()));
  };

  const goToHome = () => {
    navigate('/')
  }

  return (
    <div className="container-login">
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[requiredItem, validateEmail]}
        >
          <Input placeholder="Email"/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[requiredItem, max6]}
        >
          <Input.Password placeholder="Mật khẩu"/>
        </Form.Item>

        <Form.Item >
          <Button
            type="primary"
            htmlType="submit"
            disabled={loading ? true : false}
            loading={loading ? true : false}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
