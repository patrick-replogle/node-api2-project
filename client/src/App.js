import React from "react";
import axios from "axios";
import Form from "./components/Form.js";
import PostsList from "./components/PostsList";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      itemToEdit: {},
      isEditing: false
    };
  }

  fetchData = () => {
    axios
      .get("http://localhost:4000/api/posts")
      .then(res => {
        this.setState({
          posts: res.data.reverse()
        });
      })
      .catch(err => {
        console.log("Error fetching : ", err);
      });
  };

  deletePost = id => {
    axios
      .delete(`http://localhost:4000/api/posts/${id}`)
      .then(() => {
        this.fetchData();
      })
      .catch(err => {
        console.log("Error deleting: ", err);
      });
  };

  postPost = post => {
    axios
      .post("http://localhost:4000/api/posts", post)
      .then(() => {
        this.fetchData();
      })
      .catch(err => {
        console.log("Error posting: ", err);
      });
  };

  enableEdit = post => {
    this.setState({
      isEditing: true,
      itemToEdit: post
    });
  };

  putPost = (id, post) => {
    axios
      .put(`http://localhost:4000/api/posts/${id}`, post)
      .then(() => {
        this.fetchData();
        this.setState({
          isEditing: false,
          itemToEdit: {}
        });
      })
      .catch(err => {
        console.log("Error with put request: ", err);
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="App">
        <h1>Posts App</h1>
        <Form
          posts={this.state.posts}
          putPost={this.putPost}
          postPost={this.postPost}
          isEditing={this.state.isEditing}
          itemToEdit={this.state.itemToEdit}
          cancelEdit={this.cancelEdit}
        />
        <PostsList
          posts={this.state.posts}
          fetchData={this.fetchData}
          enableEdit={this.enableEdit}
          deletePost={this.deletePost}
        />
      </div>
    );
  }
}
export default App;
