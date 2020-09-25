import React from 'react'
import Sidebar from '../navbar/Sidebar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Reports, ReportsOne, ReportsTwo, ReportsThree, ReportsFour} from './Reports'
import Team from './Team'
import './App.css'; 

export const Overview = () => {
    return (
        <Router>
            <Sidebar />
        <Switch>
        <Route path="/reports" exact component={Reports}/>
        <Route path="/reports/reports1" exact component={ReportsOne}/>
        <Route path="/reports/reports2" exact component={ReportsTwo}/>
        <Route path="/reports/reports3" exact component={ReportsThree}/>
        <Route path="/reports/reports4" exact component={ReportsFour}/>
        <Route path="/overview/teams" exact component={Team}/>
        </Switch>
        </Router>
    )
}

export default Overview;
