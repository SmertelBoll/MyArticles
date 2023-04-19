import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import ContainerCustom from "../../components/customMUI/ContainerCustom";
import axios from "../../axios";

function CommentsPage() {
  const [comments, setComments] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`/comments`)
      .then((res) => {
        setComments(res.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.warn(err);
        alert("Помилка при отриманні коментарів");
      });
  }, []);
  return (
    <ContainerCustom paddingY>
      <Comments items={comments} isLoaded={isLoaded} />
    </ContainerCustom>
  );
}

export default CommentsPage;
