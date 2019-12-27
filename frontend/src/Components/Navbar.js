import React, { Component } from 'react';

import {Button, Table} from 'react-bootstrap';
import axios from 'axios';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser, registerUser } from "../redux/actions";

import {Nav, Navbar} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'

class MyNavbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand><NavLink exact to="/">Home</NavLink></Navbar.Brand>
        <Nav.Link><NavLink to="/login">Login</NavLink></Nav.Link>
        <Nav.Link><NavLink to="/course">CourseView</NavLink></Nav.Link>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="profile">{ this.props.auth.isAuthenticated && this.props.auth.user.username }</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

MyNavbar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { }
)(MyNavbar);
