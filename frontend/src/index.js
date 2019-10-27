import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Home from './Home';

import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from 'react-bootstrap/Navbar'

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

  setClass = (c) => {
    this.setState({class:c})
  }

  getInner = () => {
    if (this.state.class == null) {
      return <Home/>
    } else {
      return <App class={this.state.class}/>
    }
  }

  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand onclick={() => {this.setClass(null)}}>React-Bootstrap</Navbar.Brand>
        </Navbar>
        {this.getInner()}
      </div>
    );
  }
}

ReactDOM.render(<MyForm />, document.getElementById('root'));
