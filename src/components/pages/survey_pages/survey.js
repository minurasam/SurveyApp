import React, { Component } from 'react';
import 'survey-react/survey.css'
// import { Spinner } from 'reactstrap';
import * as Survey from 'survey-react';
import Json from './surv'
// import { Media } from 'reactstrap'



export default class SurveyJS extends Component {  
    render() {
      return (
        <div className="proj">
            <Survey.Survey json={Json} />
        </div>
      )
    }
  }