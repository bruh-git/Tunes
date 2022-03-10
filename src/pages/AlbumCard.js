import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  render() {
    const { album } = this.props;
    const { artworkUrl100, collectionName, artistName, collectionId } = album;
    return (
      <div>
        <img src={ artworkUrl100 } alt="" />
        <h3>{ collectionName }</h3>
        <p>{ artistName }</p>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        />
      </div>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
};

export default AlbumCard;
