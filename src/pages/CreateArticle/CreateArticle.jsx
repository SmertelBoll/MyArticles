import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box } from "@mui/material";
import ContainerCustom from "../../components/customMUI/ContainerCustom";
import SimpleMDE from "react-simplemde-editor";
import ReactDOMServer from "react-dom/server";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import InputTags from "./InputTags";
import TextFieldCustom from "../../components/customMUI/TextFieldCustom";
import MainButton from "../../components/Buttons/MainButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";

import "easymde/dist/easymde.min.css";

const InputBox = TextFieldCustom("#FAF8FF");

function CreateArticle({ update }) {
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    tags: [],
    imageUrl: null,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (update) {
      axios
        .get(`/posts/${id}`)
        .then((res) => {
          setFormData({
            title: res.data.title,
            text: res.data.text,
            tags: res.data.tags,
            image: res.data.image,
          });
        })
        .catch((err) => {
          console.log(err);
          alert("Помилка при спробі редагування");
          navigate("/");
        });
    }
  }, []);

  const onChangeTitle = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      title: e.target.value,
    }));
  };

  const onChangeText = useCallback((text) => {
    setFormData((prevData) => ({
      ...prevData,
      text: text,
    }));
  }, []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "85vh",
      autofocus: true,
      placeholder: "Enter text...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: "article-text",
      },
      previewRender(value) {
        return ReactDOMServer.renderToString(<ReactMarkdown children={value} />);
      },
    }),
    []
  );

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);

      setFormData((prevData) => ({
        ...prevData,
        imageUrl: file,
      }));
      setImageUrl(imageUrl);
    }
  };

  const handleDeleteImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      imageUrl: null,
    }));
    setImageUrl("");
  };

  const uploadRef = useRef(null);

  const handleUploadClick = () => {
    uploadRef.current.click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (update) {
      // редагування
      axios
        .patch(`posts/${id}`, formData)
        .then((res) => {
          alert("Стаття успішно змінена");
          navigate("/");
        })
        .catch((err) => {
          console.warn(err);
          alert("Помилка при редагуванні статті");
        });
    } else {
      // створення
      axios
        .post(`posts/${id}`, formData)
        .then((res) => {
          alert("Стаття успішно створена");
          navigate("/");
        })
        .catch((err) => {
          console.warn(err);
          alert("Помилка при створенні статті");
        });
    }
  };

  return (
    <ContainerCustom paddingY>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          bgcolor: "white",
          p: 3,
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* image */}
        {imageUrl && (
          <Box
            component="img"
            sx={{
              width: "100%",
              maxHeight: "60vh",
              objectFit: "cover",
              borderRadius: "8px 8px 0 0",
            }}
            src={imageUrl}
          />
        )}
        <Box sx={{ display: "flex", gap: 2 }}>
          <MainButton onClick={handleUploadClick}>Upload preview image</MainButton>
          <input type="file" onChange={handleFileInputChange} hidden ref={uploadRef} accept="image/*" />
          {imageUrl && <MainButton onClick={handleDeleteImage}>Delete image</MainButton>}
        </Box>

        {/* title */}
        <InputBox
          value={formData.title}
          onChange={onChangeTitle}
          required
          fullWidth
          id="title"
          placeholder="Title of the article..."
          name="title"
          autoFocus
          inputProps={{ style: { fontSize: 24 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 24 } }} // font size of input label
          sx={{ "& .MuiOutlinedInput-notchedOutline": { borderRadius: "8px" } }}
        />

        {/* tags */}
        <InputTags formData={formData} setFormData={setFormData} />

        {/* text */}
        <SimpleMDE value={formData.text} onChange={onChangeText} options={options} />

        <MainButton type="submit">{update ? "Update the" : "Create an"} article</MainButton>
      </Box>
    </ContainerCustom>
  );
}

export default CreateArticle;
