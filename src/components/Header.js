import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: '',
    };
  }

  // resolve o problema do código ser lido antes da API, no caso getUser é uma promisse
  async componentDidMount() {
    const user = await getUser();
    this.setState({
      loading: false,
      user: user.name,
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        {loading
          ? <Loading />
          : (
            <div>
              <h1 data-testid="header-user-name">{ user }</h1>
              <Link to="/search" data-testid="link-to-search">Search</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
              <Link to="/profile" data-testid="link-to-profile">Profile</Link>
            </div>
          )}
      </header>
    );
  }
}

export default Header;
