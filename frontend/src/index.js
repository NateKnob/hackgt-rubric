import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Home from './Home';

import 'bootstrap/dist/css/bootstrap.min.css';

import {Navbar, Container} from 'react-bootstrap'

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class: null,
    };
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let err = '';
    if (nam === "class") {
      if (val !="" && !Number(val)) {
        err = <strong>Enter a professor name</strong>;
      }
    }
    this.setState({errormessage: err});
    this.setState({[nam]: val});
  }

  changeClass = (c) => {
    this.setState({class:c})
  }

  getInner = () => {
    if (this.state.class == null) {
      return <Home class={this.state.class} changeClass={this.changeClass}/>
    } else {
      return <App class={this.state.class} changeClass={this.changeClass}/>
    }
  }

  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand onClick={() => {this.changeClass(null)}}><a href="#home">Home</a></Navbar.Brand>
        </Navbar>
        <Container>
          {this.getInner()}
        </Container>
      </div>
    );
  }
}

ReactDOM.render(<MyForm />, document.getElementById('root'));
