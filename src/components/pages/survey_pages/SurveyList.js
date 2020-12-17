import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap'


//class component 
export default class SurveyList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        description: '',
        title: '',
        startDate: new Date(),
        endDate: new Date(),
        JSONdata: '',
        Info: ''
    }
  }  
  
  componentDidMount() {
    axios.get('http://localhost:8000/projects/'+this.props.match.params.project_id)
      .then(response => {
        this.setState({
          title: response.data.title,
          description: response.data.description,
          startDate: new Date(response.data.startDate),
          endDate: new Date(response.data.endDate)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
    
    axios.get('https://api.surveyjs.io/private/Surveys/generateAccessKey?accessKey=74a14049fdf543ef9aa78fb2fedbb149')
      .then(response => {
        this.setState({
          JSONdata: response.data.Json,
          Info: response.data.Info
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('https://api.surveyjs.io/private/Surveys/getSurveyInfo?accessKey=74a14049fdf543ef9aa78fb2fedbb149&surveyId=6ccaeb76-9972-4c85-bf22-1c99711c603a')
      .then(response => {
        this.setState({
          JSONdata: response.data.Json,
          Info: response.data.Info
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
    
    
  }


  render() {
    return (
      <div className="container">
        <h3><b>Survey List of Project {this.state.title}</b></h3>
          <div className="row">
              <h3><b>{this.state.Info['Name']}</b></h3>
          </div>
          <div className="row">
              <h3><b>{this.state.Info['CreatedAt']}</b></h3>
          </div>
          <div className="row">
              <h3><b>{this.state.Info['Id']}</b></h3>
          </div>
      </div>
    )
  }
}