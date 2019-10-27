import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class ClassListing extends Component {
  constructor(props) {
    super(props);
    this.changeClass = this.props.changeClass
    this.class = this.props.class
  }

  render() {
    return (
      <tr>
        <td><a href={"#" + this.class.name} onClick={() => {this.changeClass(this.class.name)}}>{this.class.name}</a></td>
        <td>{this.class.professor}</td>
        <td>{this.class.creator}</td>
      </tr>
    );
  }
}

export default ClassListing;
