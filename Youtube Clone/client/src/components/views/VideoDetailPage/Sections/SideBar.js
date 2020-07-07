import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listVideo } from "../../../../_actions/video_actions";
import { LOAD_MORE_VIDEO } from "../../../../_actions/types";
import { Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function SideBar() {
  const dispatch = useDispatch();
  const videoState = useSelector((state) => state.video);
  const skipValue = videoState.skip;
  const limitValue = videoState.limit;

  useEffect(() => {
    const variables = {
      searchKeyword: "",
      skip: skipValue,
      limit: limitValue,
    };
    dispatch(listVideo(variables));
  }, [dispatch, skipValue, limitValue]);

  const loadMoreHandler = () => {
    const values = { skip: skipValue, limit: limitValue, loadMore: true };
    dispatch({ type: LOAD_MORE_VIDEO, payload: values });
  };

  return videoState.isLoading ? (
    <div style={{ textAlign: "center" }}>
      <LoadingOutlined style={{ fontSize: "3rem", margin: "3rem" }} />
    </div>
  ) : (
    <>
      {videoState.list.map((video) => {
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return (
          <div style={{ marginTop: "3rem", padding: "0 2rem" }} key={video._id}>
            <div style={{ width: "100%", position: "relative" }}>
              <Link to={`/video/${video._id}`} style={{ color: "gray" }}>
                <img
                  style={{ width: "100%" }}
                  src={`http://localhost:5000/${video.thumbnail}`}
                  alt="thumbnail"
                />
                <div
                  style={{
                    position: "absolute",
                    right: "0",
                    bottom: "0",
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
            <div>
              <div style={{ width: "50%" }}>
                <Link to={`/video/${video._id}`} style={{ color: "gray" }}>
                  <span style={{ fontSize: "1rem", color: "black" }}>
                    {video.title}{" "}
                  </span>
                  <br />
                  <span>{video.writer.name}</span>&nbsp;&nbsp;
                  <span>{video.views} views</span>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <Button onClick={loadMoreHandler}>Load More</Button>
      </div>
    </>
  );
}

export default SideBar;
