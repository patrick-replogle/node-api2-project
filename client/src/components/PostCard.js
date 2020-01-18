import React from "react";

const PostCard = props => {
  return (
    <div>
      <p>Title: {props.post.title}</p>
      <p>Contents: {props.post.contents}</p>
      <button
        onClick={e => {
          e.preventDefault();
          props.enableEdit(props.post);
        }}
      >
        Edit
      </button>
      <button
        onClick={e => {
          e.preventDefault();
          props.deletePost(props.post.id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default PostCard;
