import React, { Component } from 'react';

import "react-datepicker/dist/react-datepicker.css";

export default class CreateSurvey extends Component {  
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