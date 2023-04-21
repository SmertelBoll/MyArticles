import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import TextFieldCustom from "../../components/customMUI/TextFieldCustom";
import CloseIcon from "@mui/icons-material/Close";

const InputBox = TextFieldCustom("#FAF8FF");

function InputTags({ formData, setFormData }) {
  const [value, setValue] = useState("");

  const onChangeTags = (e) => {
    setValue(e.target.value);
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!formData.tags.includes(value)) {
        setFormData((prevData) => ({
          ...prevData,
          tags: [...prevData.tags, value],
        }));
      }
      setValue("");
    }
  };

  const handleDeleteTag = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: formData.tags.filter((val) => val !== value),
    }));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {/* <Box> */}
      <InputBox
        value={value}
        onChange={onChangeTags}
        onKeyPress={handleAddTag}
        fullWidth
        id="tags"
        placeholder="Tags..."
        name="tags"
        autoFocus
        sx={{ "& .MuiOutlinedInput-notchedOutline": { borderRadius: "8px" } }}
      />
      {/* </Box> */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {formData.tags &&
          formData.tags.map((name, id) => (
            <Box
              key={`${name}_${id}`}
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "black",
                pl: 2,
                borderRadius: "12px",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  display: "-webkit-box",
                  wordWrap: "break-word",
                  wordBreak: "break-all",
                }}
              >
                {name}
              </Typography>
              <IconButton
                onClick={() => {
                  handleDeleteTag(name);
                }}
              >
                <CloseIcon fontSize="small" sx={{ color: "white" }} />
              </IconButton>
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default InputTags;
