import styled from "@emotion/styled";
import { TextField } from "@mui/material";

const TextFieldCustom = (bgcolor, fontColor) => {
  return styled(TextField)(() => ({
    "& input": {
      "&:-webkit-autofill": {
        WebkitBoxShadow: `0 0 0 100px ${bgcolor} inset`,
        WebkitTextFillColor: fontColor,
      },
      color: fontColor,
    },
    label: {
      color: fontColor,
    },
    "& fieldset": {
      display: "flex",
      alignItems: "center",
    },
    "& label.Mui-focused": {
      color: fontColor,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: fontColor,
      },
      "&:hover fieldset": {
        borderColor: fontColor,
      },
      "&.Mui-focused fieldset": {
        borderColor: fontColor,
      },
    },
  }));
};

export default TextFieldCustom;
