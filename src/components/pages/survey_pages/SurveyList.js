import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap'


const Survey = (props) => (
    <div className="col-12 col-md-5 m-1">
    <Card>
      <CardBody> 
        <CardTitle>
        <b>{props.surveys['Name']}</b> 
        </CardTitle>
        <CardText>
        <b>Created: {props.surveys['CreatedAt']}</b>
        </CardText>
        <CardText>
          <b>ID: {props.surveys['Id']}</b>
        </CardText>
  
          <button className="btn btn-primary">
              <Link to={"#"}><b style={{ color:"black"}}>Run Survey</b></Link> 
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
        title: '',
        JSONdata: '',
        Info: '',
        projects: []
    }
  }  
  componentDidMount() {
    axios.get('http://localhost:8000/projects/'+this.props.match.params.id)
    .then(response => {
      this.setState({ projects: response.data })
    })
    .catch((error) => {
      console.log(error);
    }) 

    axios.get('https://api.surveyjs.io/private/Surveys/getSurveyInfo?accessKey=7a37d983080e4485b1fdddc582f7fae9&surveyId=6ccaeb76-9972-4c85-bf22-1c99711c603a')
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
    
    surveyList() {
        return <Survey surveys={this.state.Info}/>;
      }


  render() {
    return (
      <div className="container">
        <h3><b><b>Survey List of Project {this.state.title}</b></b></h3>
        <button className="btn btn-danger">  
            <Link to={"/projects/surveys/createsurvey"} project={this.state.projects._id}><b style={{ color:"black"}}>Create Survey</b></Link> 
          </button> 
        <div className="row">
            { this.surveyList() }
          </div>
      </div>
    )
  }
}