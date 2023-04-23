import { debounce } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewPosts, fetchPopularPosts } from "../../redux/slices/PostsSlice";
import { selectIsAuth } from "../../redux/slices/AuthSlice";
import axios from "../../axios";
import HomeBlock from "./HomeBlock";

const sortBy = [
  { title: "New", sortBy: "createdAt" },
  { title: "Popularity", sortBy: "viewsCount" },
  { title: "Search", sortBy: "_filter_" },
];

function Home() {
  const dispatch = useDispatch();
  const { items: newPostItems, isLoaded: isLoadedNewPosts } = useSelector((state) => state.posts.new);
  const { items: popularPostItems, isLoaded: isLoadedPopularPosts } = useSelector(
    (state) => state.posts.popular
  );

  const { data: userData, isLoaded: isLoadedDataUser } = useSelector((state) => state.auth);
  const isAuth = useSelector(selectIsAuth);

  const [searchPostItems, setSearchPostItems] = useState(null);
  const [isLoadedSearchPosts, setIsLoadedSearchPosts] = useState(false);

  const [commentItems, setCommentItems] = useState(null); // коментарі
  const [isLoadedComments, setIsLoadedComments] = useState(false); // чи загружені коментарі

  const [sortItem, setSortItem] = useState(sortBy[0]); // сортування
  const [inputText, setInputText] = useState(""); // відповідає за відображення тексту в input
  const [searchValue, setSearchValue] = useState(""); // загружається кінцеве значення після debounce для запроса

  //* comments
  useEffect(() => {
    if (isAuth) {
      axios
        .get(`/comments?limit=5`)
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

  //* posts
  // new
  useEffect(() => {
    dispatch(fetchNewPosts({ sortBy: sortBy[0].sortBy }));
  }, []);

  // popular
  useEffect(() => {
    dispatch(fetchPopularPosts({ sortBy: sortBy[1].sortBy }));
  }, []);

  // search
  useEffect(() => {
    setIsLoadedSearchPosts(false);
    axios
      .get(`/posts?filter=${searchValue}`)
      .then((res) => {
        setSearchPostItems(res.data);
        setIsLoadedSearchPosts((prev) => !prev);
      })
      .catch((err) => {
        console.warn(err);
        alert("Невдалося завантажити статті");
      });
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
    <>
      {sortBy[0].title === sortItem.title && (
        <HomeBlock
          items={newPostItems}
          isLoaded={isLoadedNewPosts}
          sortItem={sortItem}
          setSortItem={setSortItem}
          sortBy={sortBy}
          inputText={inputText}
          onChangeInput={onChangeInput}
          userData={userData}
          isLoadedDataUser={isLoadedDataUser}
          isAuth={isAuth}
          commentItems={commentItems}
          isLoadedComments={isLoadedComments}
        />
      )}
      {sortBy[1].title === sortItem.title && (
        <HomeBlock
          items={popularPostItems}
          isLoaded={isLoadedPopularPosts}
          sortItem={sortItem}
          setSortItem={setSortItem}
          sortBy={sortBy}
          inputText={inputText}
          onChangeInput={onChangeInput}
          userData={userData}
          isLoadedDataUser={isLoadedDataUser}
          isAuth={isAuth}
          commentItems={commentItems}
          isLoadedComments={isLoadedComments}
        />
      )}
      {sortBy[2].title === sortItem.title && (
        <HomeBlock
          items={searchPostItems}
          isLoaded={isLoadedSearchPosts}
          sortItem={sortItem}
          setSortItem={setSortItem}
          sortBy={sortBy}
          inputText={inputText}
          onChangeInput={onChangeInput}
          userData={userData}
          isLoadedDataUser={isLoadedDataUser}
          isAuth={isAuth}
          commentItems={commentItems}
          isLoadedComments={isLoadedComments}
        />
      )}
    </>
  );
}

export default Home;
