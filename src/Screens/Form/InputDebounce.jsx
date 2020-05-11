import React, { Component } from "react";
import _ from "lodash";
import "./Tes.css";

class InputDebounce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
    };
    this.Search = _.debounce(this.Search, 1000);
  }

  Search = () => {
    this.props.input(this.state.key);
  };

  onChange = (e) => {
    this.setState({ key: e.target.value });
    if (e.target.value) {
      this.Search();
    }
  };

  render() {
    return (
      <>
        <textarea
          type="text"
          className="input-text-area"
          name="jawab"
          value={this.state.key}
          placeholder="Masukan jawaban.."
          onChange={(e) => this.onChange(e)}
        ></textarea>
      </>
    );
  }
}

export default InputDebounce;
