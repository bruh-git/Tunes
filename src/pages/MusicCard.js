import PropTypes from 'prop-types';
import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId } = this.props;
    return (
      <div>
        <h1>{trackName}</h1>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <form>
          <label htmlFor="input-checkbox">
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
            />
          </label>
        </form>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};

export default MusicCard;
