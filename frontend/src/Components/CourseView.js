import React, { Component } from 'react';

import {Col, Row, Table, Form, Button} from 'react-bootstrap';
import CategoryListing from './CategoryListing';
import GradeListing from './GradeListing';

import axios from 'axios';

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { isEmpty } from "lodash";

class CourseView extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   loaded: false,
    //   course: null,
    // };
  }

  componentDidMount() {
    // axios.get('http://localhost:3000/class/'+this.classname)
    // .then(res => {
    //   this.setState({class: res.data, loaded:true});
    // });
  }

  refreshPage = () => {
    // axios.get('http://localhost:3000/class/'+this.classname)
    // .then(res => {
    //   this.setState({class: res.data, loaded:true});
    //   this.render();
    // });
  }

  handleGradeSubmit = (e) => {
    // e.preventDefault();
    // const data = new FormData(e.target);
    // // NOTE: you access FormData fields with `data.get(fieldName)`
    // let body = {
    //   name: data.get('name'),
    //   category: data.get('category'),
    //   percent_grade: data.get('percent_grade')
    // }
    // console.log(body);
    // let classname = this.classname;
    // axios.post('http://localhost:3000/class/'+classname+'/grade', body)
    // .then((err)=>{
    //     this.refreshPage();
    // });
  }

  render() {
    // if (this.state.loaded == false) {
    console.log(isEmpty(this.props.working_course))
    console.log(this.props.working_course)
    if (isEmpty(this.props.working_course)) {
      return "Loading..."
    } else {
      return (
        <div className="App">
          <Row>
            <Col className="text-left">
              <h1>{this.props.working_course.name}</h1>
              <h3>Taught by {this.props.working_course.professor}</h3>
              <h3>Created by {this.props.working_course.owner_name}</h3>
              <hr/>
              <Table>
                <tbody>
                  { this.props.working_course.categories.map((value, index) => {
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
                <Row>
                  <Col>
                    <Form.Group controlId="formSelect">
                      <Form.Label>Category</Form.Label>
                      <Form.Control as="select" name='category'>
                        <option value='Homework'>Homework</option>
                        <option value='Midterm'>Midterm</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formGrade">
                      <Form.Label>Percent Grade</Form.Label>
                      <Form.Control type="text" name='percent_grade' placeholder="0.85" />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
              <hr/>
              <Table>
                <tbody>
                  { this.props.working_course.grades.map((value, index) => {
                    return <GradeListing grade={value} refresh={this.refreshPage} />
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

CourseView.propTypes = {
};

const mapStateToProps = state => ({
  working_course: state.core.working_course,
  cloud_course: state.core.cloud_course
});

export default connect(
  mapStateToProps,
  { }
)(CourseView);
