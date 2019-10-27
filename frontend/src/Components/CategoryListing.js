import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class CategoryListing extends Component {
  constructor(props) {
    super(props);
    this.cat = this.props.category
  }

  render() {
    return (
      <tr>
        <td>{this.cat.name}</td>
        <td>{this.cat.weight}</td>
        <td>{this.cat.format}</td>
      </tr>
    );
  }
}

export default CategoryListing;
