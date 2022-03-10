import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumCard from './AlbumCard';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: true,
      artistName: '',
      albumsList: [],
      artistSearch: '',
      loading: false,
    };
  }

  // validate = () => {
  //   const { artistName } = this.state;
  //   const minChars = 2;
  //   const validation = artistName.length >= minChars;
  //   this.setState({ isButtonDisabled: !validation,
  //   });
  // }

  onInputChange = ({ target }) => {
    const minChars = 2;
    // const { artistName, value } = target;
    // this.setState({ [artistName]: value }, this.validate);
    this.setState({
      artistName: target.value,
      isButtonDisabled: target.value.length < minChars,
    });
  }

  handleSearchClick= (event) => {
    event.preventDefault();
    const { artistName } = this.state;
    const currArtistName = artistName;

    this.setState({
      artistName: '',
      loading: true,
    }, async () => {
      const albums = await searchAlbumsAPI(currArtistName);

      this.setState({
        loading: false,
        artistSearch: currArtistName,
        albumsList: albums,
      });
    });
  }

  render() {
    const { artistName, isButtonDisabled,
      loading, albumsList, artistSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          {loading
            ? <Loading />
            : (
              <div>
                <form>
                  <label htmlFor="search-artist-input">
                    <input
                      data-testid="search-artist-input"
                      type="text"
                      value={ artistName }
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
                </form>
                {artistSearch && (
                  <p>{`Resultado de álbuns de: ${artistSearch}`}</p>
                )}
                {!albumsList.length
                  ? <p>Nenhum álbum foi encontrado</p>
                  : (
                    <div>
                      {albumsList.map(
                        (album) => (<AlbumCard
                          album={ album }
                          key={ album.collectionId }
                        />),
                      )}
                    </div>
                  )}
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default Search;
