import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditProject extends Component {
  constructor(props) {
    super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            description: '',
            title: '',
            startDate: new Date(),
            endDate: new Date()
        }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/projects/'+this.props.match.params.id)
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

  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }
  onChangeStartDate(date) {
    this.setState({
    startDate: date
    })
  }
  onChangeEndDate(date) {
    this.setState({
      endDate: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const projects = {
      title: this.state.title,
      description: this.state.description,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    }

    console.log(projects);

    axios.post('http://localhost:8000/projects/update/' + this.props.match.params.id, projects)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div className="proj">
      <h3>Edit Project</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Title: </label>
          <input 
                type="text"
                required
                className="form-control"
                value={this.state.title}
                onChange={this.onChangeTitle}
            />
        </div>
        <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
          <div className="form-group">
            <label>Start Date: </label>
            <div>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.onChangeStartDate}
              />
            </div>
          </div>
          <div className="form-group">
            <label>End Date: </label>
            <div>
              <DatePicker
                selected={this.state.endDate}
                onChange={this.onChangeEndDate}
              />
            </div>
          </div>
          <br>
          </br>
        <div className="form-group">
          <input type="submit" value="Edit Project" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}