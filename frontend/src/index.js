import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from 'react-redux';
import store from './redux/store';

import CourseView from './components/CourseView';
import Search from './components/Search';
import Login from './components/Login';
import MyNavbar from './components/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'

class MyApplication extends React.Component {
  constructor(props) {
    super(props);
  }

  // myChangeHandler = (event) => {
  //   let nam = event.target.name;
  //   let val = event.target.value;
  //   let err = '';
  //   if (nam === "class") {
  //     if (val !="" && !Number(val)) {
  //       err = <strong>Enter a professor name</strong>;
  //     }
  //   }
  //   this.setState({errormessage: err});
  //   this.setState({[nam]: val});
  // }
  //
  // changeClass = (c) => {
  //   this.setState(Object.assign(this.state,{class:c}))
  // }
  //
  // changePage = (p) => {
  //   this.setState(Object.assign(this.state,{page:p}))
  // }

  // getInner = () => {
  //   if (this.state.page == "home") {
  //     return <Home class={this.state.class} changeClass={this.changeClass}/>
  //   } else if (this.state.page == "login") {
  //     return <Login />
  //   } else {
  //     return <App class={this.state.class} changeClass={this.changeClass}/>
  //   }
  // }

  render() {
    return (
      <Provider store={store}>
          <Router>
            <div className="App">
              <MyNavbar/>
                <Container>
                <Switch>
                  <Route exact path="/" component={Search} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/course" component={CourseView} />
                </Switch>
              </Container>
            </div>
          </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<MyApplication />, document.getElementById('root'));
