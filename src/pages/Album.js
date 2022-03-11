import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from './MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  constructor() {
    super();
    this.setState = {
      musicAlbum: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props /* informações da rota via props do component */
    const musicAlbum = await getMusics(id);
    this.setState({
      musicAlbum,
      loading: false,
    });
  }

  render() {
    const { musicAlbum, loading } = this.state;
    const { match: { params: { id } } } = this.props
    return (
      <div data-testid="page-album">
        <Header />
        {loading
          ? <Loading /> : (
            <MusicCard />
          )}
      </div>
    );
  }
}

export default Album;
