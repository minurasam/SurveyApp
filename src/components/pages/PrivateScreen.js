import { useState, useEffect } from "react";
import axios from "axios";
import React from 'react';
import Sidebar from '../navbar/Sidebar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Project from './project/Projects';
import CreateProject from './project/CreateProject';
import EditProject from './project/EditProject';
import Overview from './Overview'
import './App.css'; 
import UserProfile from './userProfile/userProfile'
import SurveyJS from './survey_pages/survey'
import AnalyticsPage from './surveys/Analytics'
import AnalyticsTabulatorPage from './surveys/AnalyticsTabulator'
import SurveyList from './survey_pages/SurveyList'
import CreateSurvey from './survey_pages/create_survey'


export const PrivateScreen = ({ history }) => {
  const [error] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    if(!localStorage.getItem("authToken")) {
      history.pushState("/login");
    }
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const { data } = await axios.get("http://localhost:8000/private", config);
      setPrivateData(data.data);
      // try {
      //   const { data } = await axios.get("http://localhost:8000/private", config);
      //   setPrivateData(data.data);
      // } catch (error) {
      //   localStorage.removeItem("authToken");
      //   setError("You are not authorized, please login");
      // }
    };

    fetchPrivateDate();
  }, [history]);
  
  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  }
  

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
      <Router>
        <div style={{ display:"flex", flexDirection: "column"}}>
          <Sidebar />  
          <button style={{ color:"white", alignItems: "center", marginLeft: "auto", backgroundColor: "Green", padding: "5px 5px 5px 5px"}} className="logout-btn" onClick={logoutHandler}>Logout</button>
          <div style={{ background: "green", color: "white" }}>{privateData}</div>  
        </div>
        <Switch>        
 
        <Route path="/account" component={UserProfile}/>
        <Route path="/projects" exact component={Project}/>
        <Route path="/reports/analytics" exact component={AnalyticsPage} />
        <Route path="/reports/tabulator" exact component={AnalyticsTabulatorPage} />
        <Route path="/projects/surveys" exact component={SurveyJS}/>
        <Route path="/projects/create-project" exact component={CreateProject}/>
        <Route path="/edit/:id" component={EditProject}/>
        <Route path="/projects/surveys/createsurvey" component={CreateSurvey}/>
        <Route path="/projects/surveys/:project_id" component={SurveyList}/>
        <Route path="/" component={Overview}/>
        </Switch>
        
        </Router>
      
  );
};

export default PrivateScreen;