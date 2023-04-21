import React from "react";
import { Box } from "@mui/material";
import ContainerCustom from "../../components/customMUI/ContainerCustom";
import SortingBlock from "../../components/Sorting/SortingBlock";
import Article from "../../components/Article/Article";
import Comments from "../Comments/Comments";
import { Link } from "react-router-dom";
import ArticleSkeleton from "../../components/Article/ArticleSkeleton";

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
              {items.length ? (
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
                <div>статей немає</div>
              )}
            </>
          ) : (
            <ArticleSkeleton count={10} />
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
              <Box
                sx={{
                  borderRadius: 2,
                  "&:hover": { outline: (theme) => `1px solid ${theme.palette.grey.dark}` },
                }}
              >
                <Comments items={commentItems} isLoaded={isLoadedComments} limit={5} smallComment />
              </Box>
            </Link>
          </Box>
        )}
      </Box>
    </ContainerCustom>
  );
}

export default HomeBlock;
