import React from 'react';
import ReactDOM from 'react-dom';

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      professor: '',
      class: null,
      errormessage: ''
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
  render() {
    return (
      <form>
      <h1>Find Your Rubric {this.state.class} {this.state.professor}</h1>
      <p>Enter your class:</p>
      <input
        type='text'
        class='class'
        onChange={this.myChangeHandler}
      />
      <p>Enter your professor:</p>
      <input
        type='text'
        name='professor'
        onChange={this.myChangeHandler}
      />
      {this.state.errormessage}
      </form>
    );
  }
}

ReactDOM.render(<MyForm />, document.getElementById('root'));
