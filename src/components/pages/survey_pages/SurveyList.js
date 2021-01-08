import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap'


const Survey = (props) => (
    <div className="col-12 col-md-5 m-1">
    <Card>
      <CardBody> 
        <CardTitle>
        <b>{props.survey.Info['Name']}</b> 
        </CardTitle>
        <CardText>
        <b>Created: {props.survey.Info['CreatedAt']}</b>
        </CardText>
        <CardText>
          <b>ID: {props.survey.Info['Id']}</b>
        </CardText>
  
          <button className="btn btn-primary">
              <Link to={"/projects/surveys/runsurvey/"+props.survey.Info['Id']}><b style={{ color:"black"}}>Run Survey</b></Link> 
          </button> ||
  
          <button className="btn btn-warning">
              <Link to={"#"}><b style={{ color:"black"}}>Edit</b></Link> 
          </button> ||
  
          <button className="btn btn-danger">  
            <a style={{ color:"black"}} > <b>Delete</b> </a>
          </button> 
        
      </CardBody  >
    </Card>
    </div>
  )

//class component 
export default class SurveyList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        projects: [],
        surveys: []
    }
  }  
  componentDidMount() {
    axios.get('http://localhost:8000/projects/'+this.props.match.params.project_id)
    .then(response => {
      this.setState({ projects: response.data })
    })
    .catch((error) => {
      console.log(error);
    }) 

    axios.get('http://localhost:8000/surveys/'+this.props.match.params.project_id)
        .then(response => {
          this.setState({
            surveys: response.data 
          }) 
        })
        .catch(function (error) {
          console.log(error);
        })
  }
    
    surveyList() {
      return this.state.surveys.map(currentsurvey => {
        return <Survey survey={currentsurvey} key={currentsurvey._id}/>;
      })
    }


  render() {
    return (
      <div className="container">
        <h3><b><b>Survey List of Project {this.state.projects.title}</b></b></h3>
        <button className="btn btn-danger">  
            <Link to={"/projects/surveys/createsurvey/"+this.props.match.params.project_id}><b style={{ color:"black"}}>Create Survey</b></Link> 
          </button> 
        <div className="row">
            { this.surveyList() }
          </div>
      </div>
    )
  }
}