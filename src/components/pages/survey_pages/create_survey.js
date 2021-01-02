import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateSurvey extends Component {  
  constructor(props) {
    super(props);

      this.onSubmit = this.onSubmit.bind(this);
      this.onChangeId = this.onChangeId.bind(this);

      this.state = {
        val: '',
        Jsondata: null,
        JSONdata: null,
        Info: null,
        project_id: this.props.project

    }
  }

  onChangeId(e) {
    this.setState({
      val: e.target.value
    })
  }

  onSubmit(e) {
    axios.get(`https://api.surveyjs.io/private/Surveys/getSurveyInfo?accessKey=7a37d983080e4485b1fdddc582f7fae9&surveyId=${this.state.val}`)
    .then(response => response.data)
    .then(data => {
      this.setState({ Jsondata: data });
  })
  if(this.state.Jsondata != null){
    e.preventDefault();
      const survey = {
        JSONdata: this.state.Jsondata.Json,
        Info: this.state.Jsondata.Info,
        project_id: this.state.project_id
      } 
    console.log(survey);

    axios.post('http://localhost:8000/surveys/create', survey)
      .then(res => console.log(res.data));

      window.location = '/projects';
    }
    else {
      console.log("not working");
    }
  }
    render() {
      return (
      <div className="proj">
        <h3>Create Survey</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Survey ID: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.val}
                onChange={this.onChangeId}
                />
          </div>
          <br>
          </br>
          <div className="form-group">
            <input type="submit" value="Create Survey" className="btn btn-primary" />
          </div>
        </form>
      </div>
      )
    }
  }