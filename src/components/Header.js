import React from "react";
import { connect } from "react-redux";

import * as actions from "../actions";
import { Link } from "react-router-dom";

class Header extends React.Component {
  state = {
    searchInput: ""
  };
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.loadAllSongs();
  }
  render() {
    return (
      <nav
        className="navbar navbar-expand-md bg-dark navbar-dark"
        style={{
          position: "fixed",
          zIndex: "5",
          width: "100%",
          display: "flex",
          alignItems: "stretch"
        }}
      >
        <div style={{ maxWidth: "300px", flexGrow: "2" }}>
          <Link className="navbar-brand" to="/">
            I-Tunes Store
          </Link>
        </div>
        <div className="navbar-nav search-container" style={{ flexGrow: "7" }}>
          <input
            type="text"
            className="input-group search-bar"
            name="searchBar"
            placeholder="Enter the song name"
            onChange={e => {
              this.setState({ searchInput: e.target.value });
            }}
          />
          <input
            type="submit"
            name="search"
            value="Search"
            className="input-group search-button"
            onClick={e => {
              this.props.searchSongs(
                this.state.searchInput,
                this.props.allSongs
              );
            }}
          />
        </div>
      </nav>
    );
  }
}
export default connect(state => state, actions)(Header);
