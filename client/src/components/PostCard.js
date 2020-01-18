import React from "react";
import axios from "axios";

class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: this.props.isEditing,
      itemToEdit: this.props.itemToEdit,
      posts: this.props.posts
    };
  }

  fetchData = () => {
    axios
      .get("http://localhost:4000/api/posts")
      .then(res => {
        console.log(res.data);
        this.setState({
          posts: res.data
        });
      })
      .catch(err => {
        console.log("Error fetching : ", err);
      });
  };

  deletePost = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:4000/api/posts/${this.props.post.id}`)
      .then(() => {
        this.fetchData();
      })
      .catch(err => {
        console.log("Error deleting: ", err);
      });
  };

  handleEdit = e => {
    e.preventDefault();
    this.setState({
      isEditing: true,
      itemToEdit: this.props.post
    });
  };

  render() {
    return (
      <div>
        <p>Title: {this.props.post.title}</p>
        <p>Contents: {this.props.post.contents}</p>
        <button onClick={this.handleEdit}>Edit</button>
        <button onClick={this.deletePost}>Delete</button>
      </div>
    );
  }
}

export default PostCard;
