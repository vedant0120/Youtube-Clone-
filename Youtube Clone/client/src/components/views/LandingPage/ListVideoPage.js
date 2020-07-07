import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Row, Card, Avatar } from "antd";
import moment from "moment";
const { Meta } = Card;

function ListVideoPage() {
  const videoState = useSelector((state) => state.video);

  const renderCards = videoState.list.map((video) => {
    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor(video.duration - minutes * 60);
    return (
      <Col
        className="gutter-row"
        lg={6}
        md={8}
        xs={24}
        key={video._id}
        style={{ padding: "1.5rem" }}
      >
        <div style={{ position: "relative" }}>
          <Link to={`/video/${video._id}`}>
            <img
              style={{ width: "100%" }}
              alt="thumbnail"
              src={`http://localhost:5000/${video.thumbnail}`}
            />
            <div
              className=" duration"
              style={{
                bottom: 0,
                right: 0,
                position: "absolute",
                margin: "4px",
                color: "#fff",
                backgroundColor: "rgba(17, 17, 17, 0.8)",
                opacity: 0.8,
                padding: "2px 4px",
                borderRadius: "2px",
                letterSpacing: "0.5px",
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "12px",
              }}
            >
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </Link>
        </div>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
        />
        <span>
          {video.writer.name} - {moment(video.createdAt).format("DD MMM YYYY")}{" "}
        </span>
        <br />
        <span style={{ marginLeft: "3rem" }}> {video.views} views</span>
      </Col>
    );
  });

  return <Row gutter={0}>{renderCards}</Row>;
}

export default ListVideoPage;
