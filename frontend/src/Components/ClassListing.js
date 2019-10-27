import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';

import ClassListing from 'Components/ClassListing'

import axios from 'axios';

class CLassListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: []
    }
  }

  search = (e) => {
    axios.get(`http://localhost:3000/class`)
      .then(res => {
        const classes = res.data;
        this.setState({ classes });
      })
  }

  render() {
    return (
      <div class='text-center'>
        <br/>
        <h1>Rubrico</h1>
        <p>Enter your class:</p>
        <input
          type='text'
          class='class'
          onChange={this.search}
        />
        <Button>Go</Button>
        <div>
          { this.state.classes.map((value, index) => {
            return
          })}
        </div>
      </div>
    );
  }
}

export default ClassListing;
