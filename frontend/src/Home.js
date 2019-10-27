import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Table} from 'react-bootstrap';
import ClassListing from './Components/ClassListing'

import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.changeClass = this.props.changeClass
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
        <h1>Rubrico</h1>
        <p>Enter your class:</p>
        <input
          type='text'
          class='class'
          onChange={this.search}
        />
        <Button>Go</Button>
        <br/>
        <Table>
          <tbody>
            { this.state.classes.map((value, index) => {
              return <ClassListing class={value} changeClass={this.changeClass} />
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Home;
