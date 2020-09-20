import React, { Component } from 'react';
import './App.css'; 
import Sidebar from './components/Sidebar';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Overview from './pages/Overview';
import {Reports, ReportsOne, ReportsTwo, ReportsThree, ReportsFour} from './pages/Reports'
import Team from './pages/Team'
import Form from './pages/registrationSignup/Form'


class App extends Component{
  render() {
    return (
     <Router>
      <Sidebar />
      <Switch>
        <div>
          <Route path="/overview" exact component={Overview}/>
        </div>      
        <Route path="/overview/home" exact component={Form}/>
        <Route path="/reports" exact component={Reports}/>
        <Route path="/reports/reports1" exact component={ReportsOne}/>
        <Route path="/reports/reports2" exact component={ReportsTwo}/>
        <Route path="/reports/reports3" exact component={ReportsThree}/>
        <Route path="/reports/reports4" exact component={ReportsFour}/>
        <Route path="/overview/teams" exact component={Team}/>

      </Switch>
     </Router>
    );
  }
}

export default App;
