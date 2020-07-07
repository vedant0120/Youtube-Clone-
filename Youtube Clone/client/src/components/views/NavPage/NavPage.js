import React, { useState, useEffect } from "react";
import { Drawer, Button, Input } from "antd";
import { MenuOutlined, YoutubeFilled } from "@ant-design/icons";
import { Col, Row } from "antd";
import LoggedInMenu from "./Sections/LoggedInMenu";
import LoggedOutMenu from "./Sections/LoggedOutMenu";
import { useDispatch, useSelector } from "react-redux";
import { ADD_KEYWORD_VIDEO, RESET_SKIP_VIDEO } from "../../../_actions/types";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

function NavPage() {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { Search } = Input;
  const [visible, setVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (userState.userData) {
      if (userState.userData._id) {
        setLoggedIn(true);
      }
    }
  }, [userState]);

  const showDrawer = () => {
    setVisible(!visible);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav
      style={{
        position: "fixed",
        width: "100%",
        top: "0",
        padding: ".5rem",
        backgroundColor: "white",
        zIndex: "999999",
      }}
    >
      <Row type="flex" align="middle">
        <Col lg={2} xs={3}>
          <Button
            type="primary"
            onClick={showDrawer}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "rgba(0,0,0,0.9)",
              fontSize: "1.5rem",
            }}
          >
            <MenuOutlined />
          </Button>
        </Col>
        <Col lg={5} xs={0} onClick={() => dispatch({ type: RESET_SKIP_VIDEO })}>
          <Link to="/">
            <YoutubeFilled
              style={{
                color: "#f5222d",
                fontSize: "2rem",
                verticalAlign: "middle",
              }}
            />
            <span
              style={{
                fontSize: "1.5rem",
                verticalAlign: "middle",
                color: "rgba(0,0,0,0.9)",
              }}
            >
              &nbsp;YouTube
            </span>
          </Link>
        </Col>
        <Col lg={10}>
          <Search
            placeholder="input search text"
            onSearch={(value) =>
              dispatch({ type: ADD_KEYWORD_VIDEO, payload: value })
            }
            style={{ width: "100%" }}
          />
        </Col>

        <Col lg={7} xs={3}>
          {loggedIn ? <LoggedInMenu /> : <LoggedOutMenu />}
        </Col>

        <Drawer
          title="Basic Drawer"
          placement="left"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <div>
            {userState.userData ? (
              userState.userData._id ? (
                <Link to="/subscription">SUBSCRIPTION</Link>
              ) : (
                <span>Login first</span>
              )
            ) : (
              <div style={{ textAlign: "center" }}>
                <LoadingOutlined style={{ fontSize: "2rem", margin: "3rem" }} />
              </div>
            )}
          </div>
        </Drawer>
      </Row>
    </nav>
  );
}

export default NavPage;
