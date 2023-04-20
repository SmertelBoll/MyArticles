import React from "react";
import { Box } from "@mui/material";
import ContainerCustom from "../../components/customMUI/ContainerCustom";
import SortingBlock from "../../components/Sorting/SortingBlock";
import Article from "../../components/Article/Article";
import Comments from "../Comments/Comments";
import { Link } from "react-router-dom";

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
          {isLoaded ? (
            <>
              {items.map((obj) => (
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

export default HomeBlock;
