import { Box, debounce } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContainerCustom from "../components/customMUI/ContainerCustom";
import SortingBlock from "../components/Sorting/SortingBlock";
import Article from "../components/Article/Article";
import Comments from "./Comments/Comments";
import { Link } from "react-router-dom";
import { fetchPosts } from "../redux/slices/PostsSlice";
import { selectIsAuth } from "../redux/slices/AuthSlice";
import axios from "../axios";

const sortBy = [
  { title: "New", sortBy: "createdAt" },
  { title: "Popularity", sortBy: "viewsCount" },
  { title: "Search", sortBy: "_filter_" },
];

function Home() {
  const dispatch = useDispatch();
  const { items: postItems, isLoaded: isLoadedPosts } = useSelector((state) => state.posts);
  const { data: userData, isLoaded: isLoadedDataUser } = useSelector((state) => state.auth);
  const isAuth = useSelector(selectIsAuth);

  const [commentItems, setCommentItems] = useState(null);
  const [isLoadedComments, setIsLoadedComments] = useState(false);
  const [sortItem, setSortItem] = useState(sortBy[0]);
  const [inputText, setInputText] = useState(""); // відповідає за відображення тексту в input
  const [searchValue, setSearchValue] = useState(""); // загружається кінцеве значення після debounce для запроса

  // comments
  useEffect(() => {
    if (isAuth) {
      axios
        .get(`/comments`)
        .then((res) => {
          setCommentItems(res.data);
          setIsLoadedComments(true);
        })
        .catch((err) => {
          console.warn(err);
          alert("Помилка при отриманні коментарів");
        });
    }
  }, [isAuth]);

  // posts (потрібно два useEffect щоб не відправляти запрос при переході на Search)
  useEffect(() => {
    if (sortItem.sortBy === "_filter_") return;
    dispatch(fetchPosts({ sortBy: sortItem.sortBy, search: searchValue }));
  }, [sortItem]);

  useEffect(() => {
    dispatch(fetchPosts({ sortBy: sortItem.sortBy, search: searchValue }));
  }, [searchValue]);

  // робота з пошуком
  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 500),
    []
  );
  const onChangeInput = (e, empty = false) => {
    if (empty) {
      // затираємо значення
      setInputText("");
      updateSearchValue("");
    } else {
      setInputText(e.target.value);
      updateSearchValue(e.target.value);
    }
  };

  return (
    <ContainerCustom>
      <SortingBlock
        sortItem={sortItem}
        setSortItem={setSortItem}
        sortBy={sortBy}
        inputText={inputText}
        onChangeInput={onChangeInput}
      />

      <Box sx={{ display: "flex", gap: 3 }}>
        {/* articles */}
        <Box
          sx={{
            flexGrow: "2",
            flexBasis: "66.67%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mb: 2,
          }}
        >
          {isLoadedPosts ? (
            <>
              {postItems.map((obj) => (
                <Article
                  key={obj._id}
                  _id={obj._id}
                  title={obj.title}
                  tags={obj.tags}
                  imageUrl={obj.imageUrl}
                  date={obj.updatedAt}
                  user={obj.user}
                  viewsCount={obj.viewsCount}
                  commentsCount={obj.commentsCount}
                  isOwner={isLoadedDataUser && isLoadedPosts ? userData?.user?._id === obj?.user?._id : false}
                />
              ))}
            </>
          ) : (
            <div>loading</div>
          )}
        </Box>

        {isAuth && (
          <Box
            sx={{
              flexGrow: "1",
              flexBasis: "33.33%",
              display: { xs: "none", md: "flex" },
            }}
          >
            {/* comments */}
            <Link style={{ width: "100%" }} to="/comments">
              <Box sx={{ borderRadius: 2, "&:hover": { outline: "1px solid black" } }}>
                <Comments items={commentItems} isLoaded={isLoadedComments} limit={5} />
              </Box>
            </Link>
          </Box>
        )}
      </Box>
    </ContainerCustom>
  );
}

export default Home;
