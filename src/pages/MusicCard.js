import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  // async componentDidMount() {
  //   await this.getStorage();
  //   this.setState({
  //     loading: false,
  //   });
  // }

  // getStorage = async () => {
  //   const songsFavorites = await getFavoriteSongs();
  //   this.setState({
  //     checked: songsFavorites,
  //   });
  // }

  handleFavoriteClick= async () => {
    this.setState({
      loading: true,
    });
    // Você deve passar para essa função um objeto no mesmo formato que você recebe da API getMusics
    const { trackName, previewUrl, trackId } = this.props;
    await addSong({
      name: trackName,
      url: previewUrl,
      id: trackId,
    });
    this.setState({ loading: false });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading } = this.state;
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
          <label htmlFor={ `check-${trackId}` }>
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              id={ `check-${trackId}` }
              onClick={ this.handleFavoriteClick }
            />
          </label>
          {/* Enquanto aguarda o retorno da função addSong,renderize a   mensagem de Carregando */}
          {loading && <Loading />}
        </form>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
