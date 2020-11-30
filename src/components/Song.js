import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import { Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

class Song extends React.Component {
  render() {
    return (
      <div className="card song-card" style={{ width: "300px" }}>
        <img
          className="card-img-top"
          src={this.props.song["im:image"][2].label}
          alt="Song"
          style={{
            width: "100%",
            maxWidth: "300px"
          }}
        />
        <div className="card-body">
          <h4 className="card-title song-title">
            {this.props.song["im:name"].label}
          </h4>
          <p className="card-text">
            {this.props.song["im:name"].label} by{" "}
            <a
              href={
                this.props.song["im:artist"].attributes
                  ? this.props.song["im:artist"].attributes["href"]
                  : "#"
              }
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              {this.props.song["im:artist"].label}
            </a>
          </p>
        </div>
        <div
          className="card-footer"
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px"
          }}
        >
          <Link
            to={`/song/${this.props.song.id.attributes["im:id"]}`}
            className="btn btn-primary details-button"
          >
            View Details
          </Link>
          {_.indexOf(
            this.props.favourites,
            this.props.song.id.attributes["im:id"]
          ) == -1 ? (
            <FavoriteBorderIcon
              className="material-icons"
              onClick={e =>
                this.props.markFavourite(this.props.song.id.attributes["im:id"])
              }
            />
          ) : (
            <FavoriteIcon
              className="material-icons"
              onClick={e =>
                this.props.unmarkFavourite(
                  this.props.song.id.attributes["im:id"]
                )
              }
            />
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    favourites: state.favourites
  };
};
export default connect(mapStateToProps, actions)(Song);
