import React, { Component } from 'react';
import 'survey-react/survey.css'
// import { Spinner } from 'reactstrap';
import * as Survey from 'survey-react';
// import { Media } from 'reactstrap'
import axios from 'axios';

export default class SurveyResult extends Component {  
  constructor(props) {
    super(props);


    this.state = {
        survey: null
    };
  }


  componentDidMount() {
    axios.get(`https://api.surveyjs.io/private/Surveys/getSurveyResults/6ccaeb76-9972-4c85-bf22-1c99711c603a?accessKey=7a37d983080e4485b1fdddc582f7fae9`)
      .then(response => {
        this.setState({ survey: response.data })
      })
      .catch((error) => {
        console.log(error);
      }) 
    }
    

    render() {
      var json = JSON.stringify(this.state.survey)
      return (
        <div className="proj">
          <div>
          <Survey.Result json={json} />
          </div>
        </div>
      )
    }
  }