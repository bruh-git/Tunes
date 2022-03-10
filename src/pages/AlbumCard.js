import PropTypes from 'prop-types';
import React, { Component } from 'react';

class AlbumCard extends Component {
  // constructor(props) {
  //   super(props);
  //   const { artistName } = this.props;
  // }

  render() {
    const { artistName } = this.props;
    return (
      <div>
        <p>{`Resultado de álbuns de:${artistName} ${ok}`}</p>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  artistName: PropTypes.string.isRequired,
};

export default AlbumCard;
