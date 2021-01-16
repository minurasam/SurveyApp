import React, { Component } from 'react';
import 'survey-react/survey.css'
// import { Spinner } from 'reactstrap';
import * as Survey from 'survey-react';
// import { Media } from 'reactstrap'
import axios from 'axios';

const Title = (props) => (
  <div>
          <h3><b><b>{props.survey.surveyTitle} </b></b></h3>
          <form>
          <label>Enter your Email: </label>
            <input  type="text"
                required
                className="form-control"
                value={props.survey.client_id}
                onChange={props.onChangeEmail}
                />
          </form>

  </div>
)

export default class SurveyJS extends Component {  
  constructor(props) {
    super(props);

    this.onCompleteComponent = this.onCompleteComponent.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.sendDataToServer = this.sendDataToServer.bind(this);

    this.state = {
      survey: "",
      surveyTitle: this.props.location.survInfo['Name'],
      survey_Id: this.props.match.params.survey_id,
      post_id: this.props.location.survInfo['PostId'],
      client_id: '',
    };
  }
  onCompleteComponent = () => {
    this.setState({
      isCompleted: true
    })
  }
  onChangeEmail(e) {
    this.setState({
      client_id: e.target.value
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
    
    sendDataToServer = (survey) => {
      const result = {
        "PostId": this.state.post_id,
        "SurveyResult": JSON.stringify(survey.data),
        "ClientId": this.state.client_id,
        "IsPartialCompleted": true
      }
  
      axios.post("https://api.surveyjs.io/public/Survey/post", result)
      .then(res => console.log(res.data))
        .catch(function (error) {
          console.log(error);
        })
      
    }

    render() {
      var json = JSON.stringify(this.state.survey)

      var showemail = !this.state.isCompleted ? (
        <Title  survey={this.state} 
                onChangeEmail={this.onChangeEmail} 
                onComplete={this.onCompleteComponent}/>
      ): null;


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
         {showemail}
          <div>
            {surveyRender}
            {onSurveyCompletion}
          </div>
        </div>
      )
    }
  }