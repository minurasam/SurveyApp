import React, { Component } from 'react';
import './App.css'; 
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

//Routing
import PrivateRoute from './components/routing/PrivateRoute';

//Screens
import FormLogin from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/SignupScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import Private from "./components/pages/PrivateScreen"

class App extends Component{
  render() {
    return (
     <Router> 
      <Switch>
        <PrivateRoute exact path="/" component={Private} /> 
        <Route path="/signup" exact component={RegisterScreen}/>
        <Route path="/login" exact component={FormLogin}/>
        <Route exact path="/forgotpassword" component={ForgotPasswordScreen}/>
        <Route exact path="/resetpassword/:resetToken" component={ResetPasswordScreen}/>
      </Switch>
     </Router>
    );
  }
}

export default App;
