import React from "react";
import { Box, Typography } from "@mui/material";
import ContainerCustom from "../../components/customMUI/ContainerCustom";
import SortingBlock from "../../components/Sorting/SortingBlock";
import Article from "../../components/Article/Article";
import Comments from "../Comments/Comments";
import { Link } from "react-router-dom";
import ArticleSkeleton from "../../components/Article/ArticleSkeleton";
import MainButton from "../../components/Buttons/MainButton";
import CreateIcon from "@mui/icons-material/Create";

function HomeBlock({
  items,
  isLoaded,
  sortItem,
  setSortItem,
  sortBy,
  inputText,
  onChangeInput,
  userData,
  isLoadedDataUser,
  isAuth,
  commentItems,
  isLoadedComments,
}) {
  return (
    <ContainerCustom paddingY sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
            gap: 3,
            mb: 2,
          }}
        >
          {isLoaded ? (
            <>
              {Boolean(items?.length) ? (
                items.map((obj) => (
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
                    isOwner={isLoadedDataUser && isLoaded ? userData?.user?._id === obj?.user?._id : false}
                  />
                ))
              ) : (
                <Box
                  sx={{
                    height: "100%",
                    minHeight: "45vh",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography variant="h2">
                    There are currently no articles available. Try it later, or write your own!
                  </Typography>
                  <Link to={isAuth ? "/create" : "/login"}>
                    <MainButton startIcon={<CreateIcon />}>Create an article</MainButton>
                  </Link>
                </Box>
              )}
            </>
          ) : (
            <ArticleSkeleton count={10} />
          )}
        </Box>
        {/* comments */}
        {isAuth && Boolean(commentItems?.length) && (
          <Box
            sx={{
              flexGrow: "1",
              flexBasis: "33.33%",
              display: { xs: "none", md: "flex" },
            }}
          >
            {/* comments */}
            <Link style={{ width: "100%" }} to="/comments">
              <Box
                sx={{
                  borderRadius: 2,
                  "&:hover": { outline: (theme) => `1px solid ${theme.palette.grey.dark}` },
                }}
              >
                <Comments items={commentItems} isLoaded={isLoadedComments} smallComment />
              </Box>
            </Link>
          </Box>
        )}{" "}
      </Box>
    </ContainerCustom>
  );
}

export default HomeBlock;
