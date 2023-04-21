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
  const [data, setData] = useState({
    title: "",
    text: "",
    tags: [],
    image: null,
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const uploadRef = useRef(null);

  // data for update
  useEffect(() => {
    if (update) {
      axios
        .get(`/posts/${id}`)
        .then((res) => {
          setData({
            title: res.data.title,
            text: res.data.text,
            tags: res.data.tags,
            image: res.data.imageUrl,
          });
          setImageUrl(res.data.imageUrl);
        })
        .catch((err) => {
          console.log(err);
          alert("Помилка при спробі редагування");
          navigate("/");
        });
    }
  }, []);

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
  // const handleFileInputChange = async (event) => {
  //   try {
  //     const file = event.target.files[0];
  //     event.target.value = null; // щоб можна було двічі загружати один і той же файл (корисно при випадковом видаленні)

  //     if (file && file.type.startsWith("image/")) {
  //       const formDataImg = new FormData();
  //       formDataImg.append("image", file);
  //       const { data } = await axios.post("/upload", formDataImg);

  //       setFormData((prevData) => ({
  //         ...prevData,
  //         imageUrl: data.url,
  //       }));
  //     }
  //   } catch (error) {
  //     console.warn(error);
  //     alert("Помилка при загрузці файлу");
  //   }
  // };

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
      alert("Помилка при загрузці файлу");
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
    console.log(data);
    if (data.image) {
      console.log(111);
      imgUrl = await uploadFileToDB();
    }

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
        .post(`/posts`, formData)
        .then((res) => {
          alert("Стаття успішно створена");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
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
