import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

function LoggedOutMenu() {
  return (
    <Row justify="center">
      <Col span={4}>
        <Link to="/login">Login</Link>
      </Col>
      <Col span={4}>
        <Link to="/register">Sign up</Link>
      </Col>
    </Row>
  );
}

export default LoggedOutMenu;
