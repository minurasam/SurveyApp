import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap'

//functional react component (lack of state and lifecyle methods)
const Project = (props) => (
  <div className="col-12 col-md-5 m-1">
  <Card>
    <CardBody>
    
      <CardTitle>
        <b>{props.projects.title}</b>
      </CardTitle>
      <CardText>
        {props.projects.description}
      </CardText>
      <CardText>
        <b>Start Date:</b> {props.projects.startDate.substring(0,10)}
      </CardText>
      <CardText>
        <b>End Date:</b>{props.projects.endDate.substring(0,10)}
      </CardText>

        <button className="btn btn-primary">
            <Link to={"/projects/surveys/"+props.projects._id}><b style={{ color:"black"}}>View</b></Link> 
        </button> ||

        <button className="btn btn-warning">
            <Link to={"/edit/"+props.projects._id}><b style={{ color:"black"}}>Edit</b></Link> 
        </button> ||

        <button className="btn btn-danger">  
          <a style={{ color:"black"}} href="#" onClick={() => { props.deleteProject(props.projects._id) }}> <b>Delete</b> </a>
        </button> 
        
        <button className="btn btn-primary">
            <Link to={"#"}><b style={{ color:"black"}}>New button</b></Link> 
        </button> 
      
    </CardBody  >
  </Card>
  </div>
)

//class component 
export default class Projects extends Component {
  constructor(props) {
    super(props);

    this.deleteProject = this.deleteProject.bind(this);

    this.state = {projects: []};
  }

  componentDidMount() {
    axios.get('http://localhost:8000/projects')
      .then(response => {
        this.setState({ projects: response.data })
      })
      .catch((error) => {
        console.log(error);
      }) 
  }

  deleteProject(id) {
    axios.delete('http://localhost:8000/projects/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      projects: this.state.projects.filter(el => el._id !== id)
    })
    window.location = '/projects';
  }

  projectList() {
    return this.state.projects.map(currentproject => {
      return <Project projects={currentproject} deleteProject={this.deleteProject} key={currentproject._id}/>;
    })
  }

  render() {
    return (
      <div className="container">
        <h3><b>Projects</b></h3>
        
          <div className="row">
            { this.projectList() }
          </div>
      </div>
    )
  }
}