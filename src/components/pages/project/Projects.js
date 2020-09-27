import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//functional react component (lack of state and lifecyle methods)
const Project = props => (
  <tr>
    <td>{props.projects.title}</td>
    <td>{props.projects.description}</td>
    <td>{props.projects.startDate.substring(0,10)}</td>
    <td>{props.projects.endDate.substring(0,10)}</td>
    <td>
    <button className="btn btn-primary">
          View 
      </button> ||
      <button className="btn btn-warning">
          <Link to={"/edit/"+props.projects._id}>Edit</Link> 
      </button> ||
      <button className="btn btn-danger">  
        <a href="#" onClick={() => { props.deleteProject(props.projects._id) }}>
          Delete
          </a>
      </button> 
    </td>
  </tr>
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
      <div className="proj">
        <h3>Projects</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.projectList() }
          </tbody>
        </table>
      </div>
    )
  }
}