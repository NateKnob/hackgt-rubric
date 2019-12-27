import React, { Component } from 'react';

import {Button, Table} from 'react-bootstrap';
import axios from 'axios';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser, registerUser, getCurrentUser } from "../redux/actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.changeClass = this.props.changeClass
    this.state = {
      username: "",
      password: ""
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmitLogin = e => {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  onSubmitRegister = e => {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.registerUser(userData);
  };

  onSubmitUser = e => {
    e.preventDefault();

    this.props.getCurrentUser();
  };

  render() {
    return (
      <div>
        <div>
          <label>Username:</label>
          <input
                  onChange={this.onChange}
                  value={this.state.username}
                  id="username"
                  type="email"
                />
        </div>
        <div>
          <label>Password:</label>
          <input
                  onChange={this.onChange}
                  value={this.state.password}
                  id="password"
                  type="password"
                />
        </div>
        <div>
          <input type="button" value="Log In" onClick={this.onSubmitLogin}/>
        </div>
        <div>
          <input type="button" value="Register" onClick={this.onSubmitRegister}/>
        </div>
        <div>
          <input type="button" value="Get Current User" onClick={this.onSubmitUser}/>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser, registerUser, getCurrentUser }
)(Login);
