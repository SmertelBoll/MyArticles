import styled from "@emotion/styled";
import { TextField } from "@mui/material";

const TextFieldCustom = (bgcolor) => {
  return styled(TextField)(() => ({
    "& input": {
      "&:-webkit-autofill": {
        WebkitBoxShadow: `0 0 0 100px ${bgcolor} inset`,
      },
    },
    "& fieldset": {
      display: "flex",
      alignItems: "center",
    },
    "& label.Mui-focused": {
      color: "#0C1618",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#0C1618",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#0C1618",
      },
    },
  }));
};

export default TextFieldCustom;
