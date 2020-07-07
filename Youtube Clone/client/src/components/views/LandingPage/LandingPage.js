import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listVideo } from "../../../_actions/video_actions";
import { Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ListVideoPage from "./ListVideoPage";
import { LOAD_MORE_VIDEO } from "../../../_actions/types";

function LandingPage() {
  const dispatch = useDispatch();
  const videoState = useSelector((state) => state.video);
  const searchKeyword = videoState.searchKeyword;
  const skipValue = videoState.skip;
  const limitValue = videoState.limit;

  useEffect(() => {
    const variables = {
      searchKeyword: searchKeyword,
      skip: skipValue,
      limit: limitValue,
    };
    dispatch(listVideo(variables));
  }, [dispatch, searchKeyword, skipValue, limitValue]);

  const loadMoreHandler = () => {
    const values = { skip: skipValue, limit: limitValue, loadMore: true };
    dispatch({ type: LOAD_MORE_VIDEO, payload: values });
  };

  return (
    <div>
      {videoState.isLoading ? (
        <div style={{ textAlign: "center" }}>
          <LoadingOutlined style={{ fontSize: "3rem", margin: "3rem" }} />
        </div>
      ) : (
        <>
          <ListVideoPage />
          <div style={{ textAlign: "center" }}>
            <Button onClick={loadMoreHandler}>Load More</Button>
          </div>
        </>
      )}
    </div>
  );
}

export default LandingPage;
