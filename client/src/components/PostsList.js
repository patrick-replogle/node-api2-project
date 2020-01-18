import React from "react";

import PostCard from "./PostCard.js";

const PostsList = props => {
  return (
    <>
      {props.posts.map(post => {
        return (
          <PostCard
            post={post}
            key={post.id}
            fetchData={props.fetchData}
            deletePost={props.deletePost}
            enableEdit={props.enableEdit}
          />
        );
      })}
    </>
  );
};

export default PostsList;
