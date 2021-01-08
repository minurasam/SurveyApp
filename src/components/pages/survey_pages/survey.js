import React, { Component } from 'react';
import 'survey-react/survey.css'
// import { Spinner } from 'reactstrap';
import * as Survey from 'survey-react';
// import { Media } from 'reactstrap'
import axios from 'axios';


export default class SurveyJS extends Component {  
  constructor(props) {
    super(props);

    this.onCompleteComponent = this.onCompleteComponent.bind(this);

    this.state = {
      survey: "",
      survey_Id: this.props.match.params.survey_id
    };
  }
  onCompleteComponent = () => {
    this.setState({
      isCompleted: true
    })
  }

  componentDidMount() {
    axios.get(`https://api.surveyjs.io/public/Survey/getSurvey?surveyId=${this.state.survey_Id}`)
      .then(response => {
        this.setState({ survey: response.data })
      })
      .catch((error) => {
        console.log(error);
      }) 
    }

    sendDataToServer = (survey) = {
      axios.pos
    }

    render() {
      var json = JSON.stringify(this.state.survey)

      var surveyRender = !this.state.isCompleted ? (
        <Survey.Survey json={json} 
          showCompletedPage={false}
          onComplete={this.onCompleteComponent && this.sendDataToServer}
        />
      ): null;

      var onSurveyCompletion = this.state.isCompleted ? (
        <div><h1>Thanks for Completing the Survey</h1></div>
      ) : null;

      return (
        <div className="proj">
          <div>
            {surveyRender}
            {onSurveyCompletion}
          </div>
        </div>
      )
    }
  }