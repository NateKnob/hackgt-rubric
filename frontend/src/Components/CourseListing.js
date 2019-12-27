import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { viewCourse } from "../redux/actions";

import {NavLink} from 'react-router-dom'

class CourseListing extends Component {
  constructor(props) {
    super(props);
    this.course = this.props.course;
  }

  handleClick = (e) => {
    console.log("wow");
    this.props.viewCourse(this.course._id);
  }

  render() {
    return (
      <tr>
        <td>{this.course.name}</td>
        <td>{this.course.professor}</td>
        <td>{this.course.owner_name}</td>
        <td><NavLink exact to="/course"><Button onClick={this.handleClick}>Go</Button></NavLink></td>
      </tr>
    );
  }
}

CourseListing.propTypes = {
};

const mapStateToProps = state => ({
});

export default connect(
  mapStateToProps,
  { viewCourse }
)(CourseListing);
