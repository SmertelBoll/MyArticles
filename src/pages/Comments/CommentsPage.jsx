import React, { useEffect } from "react";
import Comments from "./Comments";
import ContainerCustom from "../../components/customMUI/ContainerCustom";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../redux/slices/CommentsSlice";

function CommentsPage() {
  const dispatch = useDispatch();
  const { items, isLoaded } = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(fetchComments());
  }, []);
  return (
    <ContainerCustom paddingY>
      <Comments items={items} isLoaded={isLoaded} />
    </ContainerCustom>
  );
}

export default CommentsPage;
