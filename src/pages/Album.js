import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from './MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      loading: false,
      artistName: '',
      artworkUrl100: '',
      collectionName: '',
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props; // pega todas as props passadas via parametro para o componente album
    this.setState({
      loading: true,
    }, async () => {
      const data = await getMusics(id);
      const results = data.filter((_song, index) => index !== 0);
      this.setState({
        artistName: data[0].artistName,
        artworkUrl100: data[0].artworkUrl100,
        collectionName: data[0].collectionName,
        results,
        loading: false,
      });
    });
  }
  // componentDidMount = () => {
  //   this.fetchMusic()
  //     .then((response) => this.setState({
  //       results: response,
  //     }));
  // }

  // fetchMusic = async () => {
  //   const { match: { params: { id } } } = this.props;
  //   const data = await getMusics(id);
  //   this.setState({
  //     results: data,
  //     loading: false,
  //   });
  // }

  render() {
    const { loading, results, artistName, artworkUrl100, collectionName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading
          ? <Loading /> : (
            <div>
              <div>
                <img src={ artworkUrl100 } alt=" " />
                <h3 data-testid="album-name">{ collectionName }</h3>
                <p data-testid="artist-name">{ artistName }</p>
              </div>
              <div>
                {results.map(
                  (result) => (<MusicCard
                    previewUrl={ result.previewUrl }
                    trackName={ result.trackName }
                    key={ result.trackNumber }
                  />),
                )}
              </div>
            </div>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default Album;
