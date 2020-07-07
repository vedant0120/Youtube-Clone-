import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideo } from "../../../_actions/video_actions";
import { LoadingOutlined } from "@ant-design/icons";
import { Row, Col, List, Avatar } from "antd";
import SideBar from "./Sections/SideBar";
import SubscriptionPage from "./Sections/SubscriptionPage";
import LikeDislikePage from "./Sections/LikeDislikePage";
import CommentPage from "./Sections/CommentPage";

function VideoDetailPage(props) {
  const videoState = useSelector((state) => state.video);
  const userState = useSelector((state) => state.user);
  const videoId = props.match.params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideo(videoId));
  }, [dispatch, videoId]);

  if (videoState.singleVideo && userState.userData) {
    return (
      <Row>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4em" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${videoState.singleVideo.filePath}`}
              controls
            />

            <List.Item
              actions={[
                <LikeDislikePage
                  videoId={videoState.singleVideo._id}
                  userId={userState.userData._id}
                />,
                <SubscriptionPage
                  userTo={videoState.singleVideo.writer._id}
                  userFrom={userState.userData._id}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`http://localhost:5000/${videoState.singleVideo.writer.image}`}
                  />
                }
                title={videoState.singleVideo.title}
                description={videoState.singleVideo.description}
              />
            </List.Item>

            <CommentPage videoId={videoState.singleVideo._id} />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideBar />
        </Col>
      </Row>
    );
  } else {
    return (
      <div style={{ textAlign: "center" }}>
        <LoadingOutlined style={{ fontSize: "3rem", margin: "3rem" }} />
        LOADING
      </div>
    );
  }
}

export default VideoDetailPage;
