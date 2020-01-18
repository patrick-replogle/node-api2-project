import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      contents: ""
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.itemToEdit !== this.props.itemToEdit) {
      this.setState({
        title: this.props.itemToEdit.title,
        contents: this.props.itemToEdit.contents
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
    if (this.state.title !== "" && this.state.contents !== "") {
      if (this.props.isEditing) {
        this.props.putPost(this.props.itemToEdit.id, this.state);
        this.setState({
          title: "",
          contents: ""
        });
        this.props.cancelEdit();
      } else {
        this.props.postPost(this.state);
        this.setState({
          title: "",
          contents: ""
        });
      }
    }
  };

  render() {
    return (
      <>
        {this.props.isEditing ? <h2>Edit a Post</h2> : <h2>Add a Post</h2>}
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
      </>
    );
  }
}

export default Form;
