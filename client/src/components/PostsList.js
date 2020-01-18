import React, { useState, useEffect } from "react";
import axios from "axios";

import PostCard from "./PostCard.js";

class PostsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: this.props.posts,
      isEditing: this.props.isEditing,
      itemToEdit: this.props.itemToEdit
    };
  }
  fetchData = () => {
    axios
      .get("http://localhost:4000/api/posts")
      .then(res => {
        console.log(res.data);
        this.setState({
          posts: res.data.reverse()
        });
      })
      .catch(err => {
        console.log("Error fetching : ", err);
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  //   componentDidUpdate(prevProps, prevState) {
  //     if (prevState.posts !== this.state.posts) {
  //       this.fetchData();
  //     }
  //   }

  render() {
    return (
      <>
        {this.state.posts.map(post => {
          return (
            <PostCard
              post={post}
              key={post.id}
              itemToEdit={this.state.itemToEdit}
              isEditing={this.state.isEditing}
              posts={this.state.posts}
            />
          );
        })}
      </>
    );
  }
}

export default PostsList;
