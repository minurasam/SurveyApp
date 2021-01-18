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
        Jsondata: "",
        JSONdata: "",
        Info: "",
        project_id: this.props.match.params.project_id

    }
  }

  async onChangeId(e) {
    this.setState({
      val: e.target.value
    })
    this.asyncCall();
  }

  resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 20);
    });
  }
  
  async asyncCall() {
    console.log('calling');
    const result = await this.resolveAfter2Seconds();
    await axios.get(`https://api.surveyjs.io/private/Surveys/getSurveyInfo?accessKey=7a37d983080e4485b1fdddc582f7fae9&surveyId=${this.state.val}`)
    .then(response => response.data)
    .then(data => {
      this.setState({ Jsondata: data });
  }).catch(function (error) {
    console.log(error);
  })
    console.log(result);
    // expected output: "resolved"
  }


  onSubmit(e) {
      e.preventDefault();
      const survey = { 
        JSONdata: this.state.Jsondata['Json'],
        Info: this.state.Jsondata['Info'],
        project_id: this.state.project_id
      } 
    console.log(survey);

      axios.post('http://localhost:8000/surveys/create', survey)
        .then(res => console.log(res.data))
        .catch(function (error) {
          console.log(error);
        })

        window.location = `/projects/surveys/${this.state.project_id}`;
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