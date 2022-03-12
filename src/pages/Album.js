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
      loading: true,
    };
  }

  componentDidMount = () => {
    this.fetchMusic()
      .then((response) => this.setState({
        results: response,
      }));
  }

  fetchMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    this.setState({
      results: data,
      loading: false,
    });
  }

  render() {
    const { loading, results } = this.state;
    console.log(results);
    return (
      <div data-testid="page-album">
        <Header />
        {loading
          ? <Loading /> : (
            <div>
              {results.map(
                (result) => (<MusicCard
                  album={ result }
                  key={ result.collectionId }
                />),
              )}
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
