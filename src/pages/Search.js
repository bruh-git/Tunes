import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isButtonDisabled: true,
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

  render() {
    const { isButtonDisabled } = this.state;
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
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
