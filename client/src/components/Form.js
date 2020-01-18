import React from "react";
import axios from "axios";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      contents: "",
      itemToEdit: this.props.itemToEdit,
      isEditing: this.props.isEditing
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

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.itemToEdit !== this.state.itemToEdit &&
      prevState.isEditing !== this.state.isEditing
    ) {
      this.setState({
        title: this.state.itemToEdit.title,
        contents: this.state.itemToEdit.contents,
        isEditing: this.state.isEditing
      });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    //create a new object with only the state needed for the axios request
    const newPost = {
      title: this.state.title,
      contents: this.state.contents
    };

    if (this.state.title !== "" && this.state.contents !== "") {
      if (this.state.isEditing) {
        axios
          .put(
            `http://localhost:4000/api/posts/${this.state.itemToEdit.id}`,
            newPost
          )
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
      } else {
        axios
          .post("http://localhost:4000/api/posts", newPost)
          .then(() => {
            this.fetchData();
            this.setState({
              title: "",
              contents: ""
            });
          })
          .catch(err => {
            console.log("Error posting: ", err);
          });
      }
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={this.state.title}
          name="title"
          type="text"
          placeholder="title"
          onChange={this.handleChange}
        />
        <input
          value={this.state.contents}
          name="contents"
          type="text"
          placeholder="contents"
          onChange={this.handleChange}
        />
        <button>submit</button>
      </form>
    );
  }
}

export default Form;
