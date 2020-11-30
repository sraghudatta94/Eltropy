import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import * as actions from "../actions";
import SongsList from "./SongsList";

class Home extends React.Component {
  state = {
    searchInput: "",
    showSearchResult: false,
    showSorted: false,
    searchResults: [],
    sortedResults: [],
    sortButton: 0,
    showFilterDropDown: false
  };
  async componentDidMount() {
    if (this.props.songs.length === 0) {
      console.log("HOme iffff");
      await this.props.loadAllSongs();
    }
    this.props.fetchCategories(this.props.songs);
  }

  sortSongs = (columnName, order) => {
    console.log("Sorting !");
    var sortedArray = _.orderBy(
      this.props.songs,
      // ["title.label"],
      [`${columnName}`],
      order ? ["asc"] : ["desc"]
    );
    console.log(JSON.stringify(sortedArray));
    this.setState({ sortedResults: sortedArray, showSorted: true });
  };
  filterByCategory = id => {
    var filterResult = _.filter(this.props.songs, song => {
      return song.category.attributes["im:id"] === id;
    });
    this.setState({ sortedResults: filterResult, showSorted: true });
    console.log(filterResult);
  };
  listAllCategories = () => {
    var categories = [];
    for (const key in this.props.categories) {
      categories.push(
        <a
          href={`#${this.props.categories[key].name}`}
          onClick={e => {
            this.filterByCategory(key);
            this.setState({
              showFilterDropDown: false
            });
          }}
        >
          {this.props.categories[key].name}
        </a>
      );
    }
    return categories;
  };
  render() {
    return (
      <div style={{ position: "absolute", top: "80px" }}>
        <div className="songs-list-container">
          <ul className="sort-list">
            <li className="">
              <button className="btn btn-secondary">Sort By</button>
            </li>
            <li className="">
              <button
                className={`btn btn-outline-light text-dark ${
                  this.state.sortButton === 1 ? "active" : ""
                }`}
                onClick={e => {
                  this.setState({ sortButton: 1 });
                  this.props.clearSearch();

                  this.sortSongs("title.label", true);
                }}
              >
                A - Z
              </button>
            </li>
            <li className="">
              <button
                className={`btn btn-outline-light text-dark ${
                  this.state.sortButton === 2 ? "active" : ""
                }`}
                onClick={e => {
                  this.setState({ sortButton: 2 });
                  this.props.clearSearch();

                  this.sortSongs("title.label", false);
                }}
              >
                Z - A
              </button>
            </li>
            <li className="">
              <button
                className={`btn btn-outline-light text-dark ${
                  this.state.sortButton === 3 ? "active" : ""
                }`}
                onClick={e => {
                  this.setState({ sortButton: 3 });
                  this.props.clearSearch();
                  this.sortSongs("im:releaseDate.label", false);
                }}
              >
                Newest First
              </button>
            </li>
            <li className="">
              <button
                className={`btn btn-outline-light text-dark ${
                  this.state.sortButton === 4 ? "active" : ""
                }`}
                onClick={e => {
                  this.setState({ sortButton: 4 });
                  this.props.clearSearch();
                  this.sortSongs("im:releaseDate.label", true);
                }}
              >
                Oldest First
              </button>
            </li>
            <li className="">
              <button
                className={`btn btn-outline-light text-dark ${
                  this.state.sortButton === 0 ? "active" : ""
                }`}
                onClick={e => {
                  this.setState({ sortButton: 0 });
                  this.props.clearSearch();
                  this.setState({ showSorted: false });
                }}
              >
                Clear Filters
              </button>
            </li>
          </ul>
          <div className="list-icons">
            <div className="dropdown">
              <button
                onClick={e => {
                  if (this.state.showFilterDropDown) {
                    this.setState({ showFilterDropDown: false });
                    return;
                  }
                  this.setState({ showFilterDropDown: true });
                }}
                className="dropbtn icon-button"
              >
                {/* Dropdown */}
                <span className="material-icons">filter_alt</span>
              </button>
              <div
                id="myDropdown"
                className={`dropdown-content ${
                  this.state.showFilterDropDown ? "show" : ""
                }`}
              >
                {this.listAllCategories()}
              </div>
            </div>
          </div>
          {this.props.searchResults.length > 0 ? (
            <SongsList songs={this.props.searchResults} />
          ) : this.state.showSorted ? (
            <SongsList songs={this.state.sortedResults} />
          ) : (
            <SongsList songs={this.props.songs} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    songs: state.allSongs,
    categories: state.categories,
    searchResults: state.searchResults
  };
};

export default connect(mapStateToProps, actions)(Home);
