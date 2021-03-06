import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { VIDEO_SERVER } from "../../Config";
import { uploadVideo } from "../../../_actions/video_actions";

const { Title } = Typography;
const { TextArea } = Input;

const Private = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const Category = [
  { value: 0, label: "Film & Animation" },
  { value: 0, label: "Autos & Vehicles" },
  { value: 0, label: "Music" },
  { value: 0, label: "Pets & Animals" },
  { value: 0, label: "Sports" },
];

function UploadVidoPage(props) {
  const user = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState(0);
  const [category, setCategory] = useState("Film & Animation");
  const [filePath, setFilePath] = useState("");
  const [duration, setDuration] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const dispatch = useDispatch();

  const handleChangeTitle = (event) => {
    setTitle(event.currentTarget.value);
  };

  const handleChangeDecsription = (event) => {
    setDescription(event.currentTarget.value);
  };

  const handleChangePrivacy = (event) => {
    setPrivacy(event.currentTarget.value);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (user.userData && !user.userData.isAuth) {
      return alert("Please Log in First");
    }

    if (
      title === "" ||
      description === "" ||
      category === "" ||
      filePath === "" ||
      duration === "" ||
      thumbnail === ""
    ) {
      return alert("Please fill all fields");
    }

    const variables = {
      writer: user.userData._id,
      title: title,
      description: description,
      privacy: privacy,
      filePath: filePath,
      category: category,
      duration: duration,
      thumbnail: thumbnail,
    };

    dispatch(uploadVideo(variables)).then((response) => {
      if (response.payload.success) {
        alert("Video has been uploaded successfully");
        props.history.push("/");
      } else {
        alert("Video upload Failed");
      }
    });
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    axios
      .post(`${VIDEO_SERVER}/file-upload`, formData, config)
      .then((response) => {
        if (response.data.success) {
          let variable = {
            filePath: response.data.filePath,
            fileName: response.data.fileName,
          };
          setFilePath(response.data.filePath);
          //gerenate thumbnail with this filepath !

          axios.post(`${VIDEO_SERVER}/thumbnail`, variable).then((response) => {
            if (response.data.success) {
              setDuration(response.data.fileDuration);
              setThumbnail(response.data.thumbsFilePath);
            } else {
              alert("Failed to make the thumbnails");
            }
          });
        } else {
          alert("failed to save the video in server");
        }
      });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Upload Video</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <PlusOutlined style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone>

          {thumbnail !== "" && (
            <div>
              <img src={`http://localhost:5000/${thumbnail}`} alt="thumbnail" />
            </div>
          )}
        </div>

        <br />
        <br />
        <label>Title</label>
        <Input onChange={handleChangeTitle} value={title} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={handleChangeDecsription} value={description} />
        <br />
        <br />

        <select
          onChange={handleChangePrivacy}
          style={{
            width: "100%",
            height: "2rem",
            border: "1px #d9d9d9 solid",
            borderRadius: "2px",
          }}
        >
          {Private.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />

        <select
          onChange={handleChangeCategory}
          style={{
            width: "100%",
            height: "2rem",
            border: "1px #d9d9d9 solid",
            borderRadius: "2px",
          }}
        >
          {Category.map((item, index) => (
            <option key={index} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />

        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UploadVidoPage;
