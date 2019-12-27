import React, { Component } from 'react';

import {Button, Table} from 'react-bootstrap';
import ClassListing from './CourseListing'

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { queryCourses } from "../redux/actions";

import axios from 'axios';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSearch = (e) => {
    this.props.queryCourses({ query: this.state.query });
  }

  render() {
    return (
      <div class='text-center'>
        <h1>Rubrico</h1>
        <p>Enter your class:</p>
        <input
          type='text'
          class='class'
          id='query'
          onChange={this.onChange}
        />
        <Button onClick={this.onSearch}>Go</Button>
        <br/>
        <Table>
          <tbody>
            { this.props.courses.map((value, index) => {
              return <ClassListing course={value} />
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

Search.propTypes = {
  queryCourses: PropTypes.func.isRequired,
  core: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
 courses: state.core.courses
});

export default connect(
  mapStateToProps,
  { queryCourses }
)(Search);
