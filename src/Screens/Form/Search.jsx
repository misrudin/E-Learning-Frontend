import React, { Component } from "react";
import _ from "lodash";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
    };
    this.Search = _.debounce(this.Search, 800);
  }

  Search = () => {
    this.props.search(this.state.key);
  };

  onChange = (e) => {
    this.setState({ key: e.target.value });
    this.Search();
  };

  render() {
    return (
      <div>
        <input
          type="text"
          className="form-control shadow-sm cariinput border-0"
          name="search"
          required
          value={this.state.key}
          placeholder="Cari ..."
          onChange={(e) => this.onChange(e)}
        />
        {this.state.key.length > 0 ? (
          <p
            className="bersih"
            onClick={() => {
              this.setState({ key: "" });
              this.Search();
            }}
          >
            x
          </p>
        ) : null}
      </div>
    );
  }
}

export default Search;
