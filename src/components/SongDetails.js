import React from "react";
import _ from "lodash";
import { connect } from "react-redux";

import * as actions from "../actions";
import { Link } from "react-router-dom";

class SongDetails extends React.Component {
  async componentDidMount() {
    if (this.props.allSongs.length === 0) {
      await this.props.loadAllSongs();
    }
  }
  render() {
    if (!this.props.song) {
      return <div>Loading...</div>;
    }
    return (
      <div
        className="container"
        style={{
          position: "absolute",
          top: "120px",
          marginLeft: "50px"
        }}
      >
        <div className="row">
          <img
            src={this.props.song["im:image"][2].label}
            className="col-md-4 col-sm-6 col-lg-4"
            style={{ maxHeight: "300px", maxWidth: "300px" }}
          />
          <div className="col-md-6 col-sm-6 col-lg-6">
            <h2 style={{ marginTop: "10px" }}>
              {this.props.song["im:name"].label}
            </h2>
            <div>
              {`${this.props.song["im:contentType"].attributes.label} ${this.props.song["im:contentType"]["im:contentType"].attributes.label} by `}
              <span>
                <a
                  href={
                    this.props.song["im:artist"].attributes
                      ? this.props.song["im:artist"].attributes.href
                      : "#"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {this.props.song["im:artist"].label}
                </a>
              </span>
            </div>
            <div>
              Available for{" "}
              <span style={{ fontWeight: "bold" }}>
                {" "}
                {this.props.song["im:price"].label}
              </span>
            </div>
            <div>
              Release Date : &nbsp;
              {this.props.song["im:releaseDate"].attributes.label}{" "}
            </div>
            <div>
              <button
                disabled
                className="btn btn-info"
                style={{
                  marginTop: "10px",
                  fontSize: "18px",
                  fontWeight: "bold"
                }}
              >
                {this.props.song["category"].attributes.term}
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-10 col-lg-10">
            {this.props.song["rights"].label}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-4"></div>
          <div className="col-md-14 col-sm-10 col-lg-4 col-xs-10">
            <Link
              to="/"
              style={{
                alignContent: "center",
                textAlign: "center",
                fontSize: "24px"
              }}
            >
              <i
                className="material-icons"
                style={{
                  fontSize: "36px",
                  fontWeight: "bolder",
                  position: "relative",
                  top: "9px"
                }}
              >
                arrow_back
              </i>
              Take me back
            </Link>
          </div>
          <div className="col-lg-4 col-md-4"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    allSongs: state.allSongs,
    song: _.find(state.allSongs, song => {
      return song.id.attributes["im:id"] == props.match.params.id;
    })
  };
};
export default connect(mapStateToProps, actions)(SongDetails);
