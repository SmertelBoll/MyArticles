import React, { useEffect, useState, useRef, useCallback } from "react";
import Comments from "./Comments";
import ContainerCustom from "../../components/customMUI/ContainerCustom";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MainButton from "../../components/Buttons/MainButton";

const limit = 10;

function CommentsPage() {
  const [skip, setSkip] = useState(0);
  const [comments, setComments] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleLoadMore = () => {
    axios
      .get(`/comments?limit=${limit}&skip=${skip}`)
      .then((res) => {
        if (res.data?.length === 0) setHasMore(false);

        setComments((prev) => [...prev, ...res.data]);

        setIsLoaded(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Помилка при отриманні коментарів");
      });
  };

  useEffect(() => {
    if (hasMore) {
      setIsLoading(true);
      handleLoadMore();
    }
  }, [skip]);

  const loader = useRef(null);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading) {
      setSkip((prev) => prev + limit);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <ContainerCustom paddingY sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <MainButton startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ alignSelf: "start" }}>
        Back
      </MainButton>
      <Comments items={comments} isLoaded={isLoaded} hasMore={hasMore} />
      <div ref={loader} disabled></div>
    </ContainerCustom>
  );
}

export default CommentsPage;
