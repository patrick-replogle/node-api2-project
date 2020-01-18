import React from "react";
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
  render() {
    return (
      <div className="App">
        <h1>Posts App</h1>
        <Form
          posts={this.state.posts}
          itemToEdit={this.state.itemToEdit}
          isEditing={this.state.isEditing}
        />
        <PostsList
          posts={this.state.posts}
          itemToEdit={this.state.itemToEdit}
          isEditing={this.state.isEditing}
        />
      </div>
    );
  }
}
export default App;
