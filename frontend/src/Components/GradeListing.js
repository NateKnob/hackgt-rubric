import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { FaTrash } from 'react-icons/fa';

import axios from 'axios';

class GradeListing extends Component {
  constructor(props) {
    super(props);
    this.grade = this.props.grade;
    this.refresh = this.props.refresh;
  }

  destroy = () => {
    console.log(this.grade);
    axios.post('http://localhost:3000/class/'+this.classname+'/grade/delete', {_id:this.grade._id})
    .then(res => {
      this.refresh();
    });
  }

  render() {
    return (
      <tr>
        <td>{this.grade.name}</td>
        <td>{this.grade.category}{this.grade._id}</td>
        <td>{this.grade.percent_grade}</td>
        <td><Button className='btn-danger' onClick={this.destroy}><FaTrash/></Button></td>
      </tr>
    );
  }
}

export default GradeListing;
