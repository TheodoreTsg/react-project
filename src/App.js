import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './layout/layout.scss';
import {HomePage} from './HomePage/HomePage';
import {PrivateRoute} from './PrivateRoute/PrivateRoute';
import {LoginPage} from './LoginPage/LoginPage';
import {ResetPage} from './ResetPage/ResetPage';
import ScrollToTop from './ScrollToTop';
import { SignUpPage } from './SignUpPage/SignupPage';

class App extends Component  {

  render () {
    return (
          <Router>
            <ScrollToTop>
                <PrivateRoute exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/reset" component={ResetPage} />
                <Route path="/signup" component={SignUpPage} />
            </ScrollToTop>
          </Router>
    );
  }
}

export default App;
