import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css'; 
import Sidebar from './components/SideBar/Sidebar';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Overview from './pages/Overview';
import {Reports} from './pages/Reports'
import Team from './pages/Team'
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignIn/SignUp';

class App extends Component{
  render() {
    return (
     <Router>
      <Sidebar />
      <Switch>
        <Route path="/signup" exact component={SignUp}/>
        <Route path="/overview" exact component={Overview}/>
        <Route path="/reports" exact component={Reports}/>
        <Route path="/overview/teams" exact component={Team}/>
        <Route path="/overview/home" exact component={SignIn}/>
      </Switch>
     </Router>
    );
  }
}

export default App;
