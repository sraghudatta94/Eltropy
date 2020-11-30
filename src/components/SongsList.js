import React from "react";

import Song from "./Song";

class SongsList extends React.Component {
  renderSongList = list => {
    var songs = [];
    if (list.length <= 0) {
      return (
        <div>
          <h4>Sorry, No Songs Found at this time. Please try again ! .</h4>
        </div>
      );
    }
    for (var i = 0; i < list.length; i++) {
      songs.push(<Song song={list[i]} />);
    }
    return songs;
  };

  render() {
    return (
      <div class="containerS songs-list-container">
        {this.renderSongList(this.props.songs)}
      </div>
    );
  }
}

export default SongsList;
