import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumCard from './AlbumCard';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isButtonDisabled: true,
      artistName: '',
      searchAlbum: [],
      loading: false,
    };
  }

  validate = () => {
    const { name } = this.state;
    const minChars = 2;
    const validation = name.length >= minChars;
    this.setState({ isButtonDisabled: !validation,
    });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validate);
  }

  handleSearchClick= (event) => {
    event.preventDefault();

    const { searchAlbum, loading } = this.state;

    this.setState({
      loading: true,
    }, async () => {
      await searchAlbumsAPI({ searchAlbum });
    });
    console.log(searchAlbum);
  }

  render() {
    const { isButtonDisabled, loading, artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-artist-input">
            <input
              data-testid="search-artist-input"
              type="text"
              name="name"
              placeholder="Nome do Artista"
              onChange={ this.onInputChange }
            />
          </label>
          <button
            id="btn"
            type="submit"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
            onClick={ this.handleSearchClick }
          >
            Pesquisar
          </button>
          <div>
            {artistName.map((artist)=> {
              return <AlbumCard data-testid={`link-to-album-${collectionId}`} />
            })
            }
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
