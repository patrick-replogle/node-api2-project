import React from "react";

import PostCard from "./PostCard.js";

class PostsList extends React.Component {
  render() {
    return (
      <>
        {this.props.posts.map(post => {
          return (
            <PostCard
              post={post}
              key={post.id}
              fetchData={this.props.fetchData}
              deletePost={this.props.deletePost}
              enableEdit={this.props.enableEdit}
            />
          );
        })}
      </>
    );
  }
}

export default PostsList;
