import React from "react";

class PostCard extends React.Component {
  render() {
    return (
      <div>
        <p>Title: {this.props.post.title}</p>
        <p>Contents: {this.props.post.contents}</p>
        <button
          onClick={e => {
            e.preventDefault();
            this.props.enableEdit(this.props.post);
          }}
        >
          Edit
        </button>
        <button
          onClick={e => {
            e.preventDefault();
            this.props.deletePost(this.props.post.id);
          }}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default PostCard;
