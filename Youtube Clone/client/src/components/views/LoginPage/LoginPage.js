import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Col,
  Typography,
  Alert,
  Row,
} from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  SmileOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_actions";
import { Link } from "react-router-dom";

function LoginPage(props) {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const checkValueOfRememerMe = localStorage.getItem("rememberMe")
    ? true
    : false;

  const [rememberMe, setRememberMe] = useState(checkValueOfRememerMe);
  const handleRememberMe = (e) => {
    setRememberMe(!rememberMe);
  };

  const [email, setEmail] = useState(localStorage.getItem("rememberMe"));
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.type === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const onFinish = (values) => {
    const formData = {
      email: values.Email,
      password: values.Password,
    };

    dispatch(loginUser(formData)).then((response) => {
      if (response.payload.loginSuccess) {
        if (rememberMe) {
          window.localStorage.setItem("rememberMe", email);
        } else {
          localStorage.removeItem("rememberMe");
        }
        props.history.push("/");
      } else {
        setErrorMessage(response.payload.message);
      }
    });
  };

  return (
    <Row
      type="flex"
      align="middle"
      style={{ marginTop: "2rem", height: "100vh" }}
    >
      <Col className="gutter-row" lg={{ span: 10, offset: 7 }}>
        <Title level={2}>LOGIN</Title>
        <Form onFinish={onFinish} initialValues={{ Email: email }}>
          <Form.Item
            name={"Email"}
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              value={email}
              type="email"
              onChange={handleChange}
              placeholder="Enter E-mail"
            />
          </Form.Item>
          <Form.Item
            name={"Password"}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              value={password}
              onChange={handleChange}
              placeholder="Enter password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          <Checkbox
            onClick={handleRememberMe}
            checked={rememberMe}
            style={{ marginLeft: "1rem" }}
          >
            Remember me
          </Checkbox>
          <Form.Item style={{ textAlign: "center" }}>
            <Link to="/register" style={{ color: "#ff4d4f" }}>
              <SmileOutlined />
              &nbsp;&nbsp;Don't you have an account? Sign up
            </Link>
          </Form.Item>
        </Form>
        {errorMessage && <Alert message={errorMessage} type="error" />}
      </Col>
    </Row>
  );
}

export default LoginPage;
