import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, debounce } from "@mui/material";
import ReactDOMServer from "react-dom/server";
import { useNavigate, useParams } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import SimpleMDE from "react-simplemde-editor";
import { useTheme } from "@mui/material/styles";
import axios from "../../axios";

import { alertSuccess, alertError, alertConfirm } from "../../alerts";
import { useSelector } from "react-redux";
import ContainerCustom from "../../components/customMUI/ContainerCustom";
import InputTags from "./InputTags";
import TextFieldCustom from "../../components/customMUI/TextFieldCustom";
import MainButton from "../../components/Buttons/MainButton";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "easymde/dist/easymde.min.css";

function CreateArticle({ update }) {
  const theme = useTheme();
  const InputBox = useMemo(
    () => TextFieldCustom(theme.palette.bg.second, theme.palette.text.main),
    [theme.palette.mode]
  );

  const [imageUrl, setImageUrl] = useState("");
  const [data, setData] = useState({
    title: "",
    text: "",
    tags: [],
    image: null,
  });

  const { id } = useParams(); // if update
  const { data: userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const uploadRef = useRef(null);

  // data
  useEffect(() => {
    if (update) {
      axios
        .get(`/posts/${id}`)
        .then((res) => {
          if (res.data.user._id !== userData?._id && userData?.accessLevel !== "admin") {
            navigate("/");
          }

          setData({
            title: res.data.title,
            text: res.data.text,
            tags: res.data.tags,
            image: res.data.imageUrl,
          });
          setImageUrl(res.data.imageUrl);
        })
        .catch((err) => {
          console.warn(err);
          alertError("Editing error", "");
          navigate("/");
        });
    } else {
      const inputDataJSON = window.localStorage.getItem("inputData");

      if (inputDataJSON !== null) {
        const inputData = JSON.parse(inputDataJSON);

        setData((prevData) => ({
          ...prevData,
          title: inputData.title,
          text: inputData.text,
          tags: inputData.tags,
        }));
      }
    }
  }, [userData]);

  const onChangeTitle = (e) => {
    setData((prevData) => ({
      ...prevData,
      title: e.target.value,
    }));
  };

  const onChangeText = useCallback((text) => {
    setData((prevData) => ({
      ...prevData,
      text: text,
    }));
  }, []);

  //textArea
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

  // upload image
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    event.target.value = null; // щоб можна було двічі загружати один і той же файл (корисно при випадковом видаленні)

    if (file && file.type.startsWith("image/")) {
      const image = URL.createObjectURL(file);

      setData((prevData) => ({
        ...prevData,
        image: file,
      }));
      setImageUrl(image);
    }
  };

  // upload image to DB
  const uploadFileToDB = async () => {
    try {
      if (data.image && typeof data.image === "string") return data.image;

      const formDataImg = new FormData();
      formDataImg.append("image", data.image);

      const { data: dataUrl } = await axios.post("/upload", formDataImg);

      return `http://localhost:4444${dataUrl.url}`;
    } catch (error) {
      console.warn(error);
      alertError("Image error", "Error loading file");
      return null;
    }
  };

  //remove image
  const handleDeleteImage = () => {
    setData((prevData) => ({
      ...prevData,
      image: null,
    }));
    setImageUrl("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let imgUrl = "";
    if (data.image) {
      imgUrl = await uploadFileToDB();
    }

    if (imgUrl === null) return;

    const formData = {
      title: data.title,
      text: data.text,
      tags: data.tags,
      imageUrl: imgUrl,
    };

    if (update) {
      // редагування
      axios
        .patch(`/posts/${id}`, formData)
        .then((res) => {
          alertSuccess("The article has been successfully modified");
          navigate("/");
        })
        .catch((err) => {
          console.warn(err);
          alertError("Editing error", "Error editing the article");
        });
    } else {
      // створення
      axios
        .post(`/posts`, formData)
        .then((res) => {
          alertSuccess("Article successfully created");
          window.localStorage.removeItem("inputData");
          navigate("/");
        })
        .catch((err) => {
          console.warn(err);
          alertError("Article error", "Error creating the article");
        });
    }
  };

  const backFunc = () => {
    window.localStorage.removeItem("inputData");
    navigate(-1);
  };

  const handleBack = () => {
    alertConfirm("Are you sure you want to log out? Your changes will not be saved", backFunc);
  };

  const updateData = useCallback(
    debounce((obj) => {
      const inputData = {
        title: obj.title,
        text: obj.text,
        tags: obj.tags,
      };
      window.localStorage.setItem("inputData", JSON.stringify(inputData));
    }, 2000),
    []
  );

  useEffect(() => {
    if (!update) updateData(data);
  }, [data]);

  return (
    <ContainerCustom paddingY sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <MainButton startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ alignSelf: "start" }}>
        Back
      </MainButton>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          bgcolor: "bg.second",
          p: 3,
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          boxShadow: 0,
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
            src={imageUrl ? imageUrl : data.image}
          />
        )}
        <Box sx={{ display: "flex", gap: 2 }}>
          <MainButton onClick={() => uploadRef.current.click()}>Upload preview image</MainButton>
          <input
            id="UploadWidgetId"
            type="file"
            onChange={handleFileInputChange}
            hidden
            ref={uploadRef}
            accept="image/*"
          />
          {imageUrl && <MainButton onClick={handleDeleteImage}>Delete image</MainButton>}
        </Box>

        {/* title */}
        <InputBox
          value={data.title}
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
        <InputTags formData={data} setFormData={setData} />

        {/* text */}
        <SimpleMDE value={data.text} onChange={onChangeText} options={options} />

        <MainButton type="submit">{update ? "Update the" : "Create an"} article</MainButton>
      </Box>
    </ContainerCustom>
  );
}

export default CreateArticle;
