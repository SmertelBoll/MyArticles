import React from "react";
import CommentsBlock from "./Comments/CommentBlock";
import ContainerCustom from "../components/customMUI/ContainerCustom";

function CommentsPage() {
  return (
    <ContainerCustom paddingY>
      <CommentsBlock />
    </ContainerCustom>
  );
}

export default CommentsPage;
