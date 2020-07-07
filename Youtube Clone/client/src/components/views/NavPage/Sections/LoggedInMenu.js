import React, { useState } from "react";
import { Drawer, Row, Avatar, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../../_actions/user_actions";

function LoggedInMenu(props) {
  console.log(props);
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(!visible);
  };
  const onClose = () => {
    setVisible(false);
  };

  const onLogout = (e) => {
    dispatch(logoutUser()).then(async (response) => {
      if (response.payload.success) {
        await window.location.reload(false);
      }
    });
  };

  return (
    <Row justify="end">
      <Avatar
        src={`http://localhost:5000/${userState.userData.image}`}
        onClick={showDrawer}
      />
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Button onClick={onLogout} type="primary">
          {" "}
          Log out
        </Button>
      </Drawer>
    </Row>
  );
}

export default LoggedInMenu;
