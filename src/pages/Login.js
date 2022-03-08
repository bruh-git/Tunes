import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loginButtonDisabled: true,
      loading: false,
      redirect: false,
    };
  }

  validate = () => {
    const { name } = this.state;
    const minChars = 3;
    const validation = name.length >= minChars;
    this.setState({ loginButtonDisabled: !validation,
    });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validate);
  }

  handleClick= (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name });
      this.setState({
        redirect: true,
      });
    });
  }

  render() {
    const { loginButtonDisabled, loading, redirect } = this.state;
    return (
      <div data-testid="page-login">
        {loading === true
          ? <Loading />
          : (
            <form>
              <label htmlFor="name-input">
                Nome:
                <input
                  data-testid="login-name-input"
                  type="text"
                  name="name"
                  placeholder="Usuário"
                  onChange={ this.onInputChange }
                />
              </label>
              <button
                id="btn-input"
                type="submit"
                data-testid="login-submit-button"
                disabled={ loginButtonDisabled }
                onClick={ this.handleClick }
              >
                Entrar
              </button>
            </form>
          )}
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
