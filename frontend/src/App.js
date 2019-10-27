import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {Col, Row, Table, Form, Button} from 'react-bootstrap';
import CategoryListing from './Components/CategoryListing';

import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.classname = this.props.class;
    this.state = {
      loaded: false,
      class: null,
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/class/'+this.classname)
    .then(res => {
      this.setState({class: res.data, loaded:true});
    });
  }

  handleGradeSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    // NOTE: you access FormData fields with `data.get(fieldName)`
    let body = {
      name: data.get('name'),
      category: data.get('category'),
      percent_grade: data.get('percent_grade')
    }
    console.log(body);
    let classname = this.classname;
    axios.post('http://localhost:3000/class/'+classname+'/grade', body);
  }

  render() {
    if (this.state.loaded == false) {
      return "Loading..."
    } else {
      return (
        <div className="App">
          <Row>
            <Col className="text-left">
              <h1>{this.state.class.name}</h1>
              <h3>Taught by {this.state.class.professor}</h3>
              <h3>Created by {this.state.class.creator}</h3>
              <hr/>
              <Table>
                <tbody>
                  { this.state.class.rubric.map((value, index) => {
                    return <CategoryListing category={value} />
                  })}
                </tbody>
              </Table>
            </Col>
            <Col>
            <Form onSubmit={this.handleGradeSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Assignment Name</Form.Label>
                <Form.Control type="text" name='name' placeholder="Homework 3" />
              </Form.Group>

              <Form.Group controlId="formSelect">
                <Form.Label>Category</Form.Label>
                <Form.Control as="select" name='category'>
                  <option value='Homework'>Homework</option>
                  <option value='Midterm'>Midterm</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formGrade">
                <Form.Label>Percent Grade</Form.Label>
                <Form.Control type="text" name='percent_grade' placeholder="0.85" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
              Hm
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default App;
