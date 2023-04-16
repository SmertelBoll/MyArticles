import React, { useCallback, useMemo, useRef, useState } from "react";
import ContainerCustom from "../../components/customMUI/ContainerCustom";
import SimpleMDE from "react-simplemde-editor";
import ReactDOMServer from "react-dom/server";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import InputTags from "./InputTags";
import "easymde/dist/easymde.min.css";
import TextFieldCustom from "../../components/customMUI/TextFieldCustom";
import { Box } from "@mui/material";
import MainButton from "../../components/Buttons/MainButton";

const InputBox = TextFieldCustom("#FAF8FF");

function CreateArticle() {
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    tags: [],
    image: null,
  });

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
      maxHeight: "400px",
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
        image: file,
      }));
      setImageUrl(imageUrl);
    }
  };

  const handleDeleteImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      image: null,
    }));
    setImageUrl("");
  };

  const uploadRef = useRef(null);

  const handleUploadClick = () => {
    uploadRef.current.click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
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

        <MainButton type="submit">Create the article</MainButton>
      </Box>
    </ContainerCustom>
  );
}

export default CreateArticle;
