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
        Jsondata: '',
        JSONdata: '',
        Info: '',
        project_id: ''
    }
  }

  onChangeId(e) {
    this.setState({
      val: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    axios.get('https://api.surveyjs.io/private/Surveys/getSurveyInfo?accessKey=7a37d983080e4485b1fdddc582f7fae9&surveyId='+this.state.val)
        .then(response => {
          this.setState({
            Jsondata: response.data
          }) 
        })
        .catch(function (error) {
          console.log(error);
        })
        
    const survey = {
      JSONdata: this.state.Jsondata['Json'],
      Info: this.state.Jsondata['Info'],
      project_id: "609d6e82241cfe28d879b834"
    }

    console.log(survey);

    axios.post('http://localhost:8000/surveys/create', survey)
      .then(res => console.log(res.data));

      window.location = '/projects';
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