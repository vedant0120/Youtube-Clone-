import React, { useState } from "react";
import {
  Form,
  Input,
  Tooltip,
  Row,
  Col,
  Button,
  Alert,
  Typography,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_actions";

function RegisterPage(props) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const { Title } = Typography;
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const formData = {
      email: values.email,
      password: values.password,
      name: values.name,
    };

    dispatch(registerUser(formData)).then((response) => {
      console.log("dispatch working");
      if (response.payload.success) {
        props.history.push("/login");
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
        <Title level={2} style={{ textAlign: "center" }}>
          SIGN UP
        </Title>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
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
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              { min: 7, message: "Password must be minimum 7 characters." },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="name"
            label={
              <span>
                Channel Name&nbsp;
                <Tooltip title="This name will be used for your channel">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: "Please input your channel name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
        <Form.Item {...tailFormItemLayout}>
          {errorMessage && <Alert message={errorMessage} type="error" />}
        </Form.Item>
      </Col>
    </Row>
  );
}

export default RegisterPage;
