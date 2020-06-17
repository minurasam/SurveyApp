import React, { Component,useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import * as Survey from 'survey-react';
import { Media } from 'reactstrap'



export default class SurveyJS extends Component {  

    constructor(props) {
        super(props);
        
        this.state = {
            surveys: [
                {
                    "Info": {
                        "Name": "Minura",
                        "IsArchived": false,
                        "UserId": "faa9169a-c990-45c2-a063-d36659ca2808",
                        "CreatorId": "00000000-0000-0000-0000-000000000000",
                        "PostId": "e29acc5a-8819-41c4-9d38-e402227ecdeb",
                        "ResultId": "006df6fa-bbb4-4b7d-8956-62c3074273e7",
                        "PublishId": null,
                        "IsPublished": null,
                        "UseCookies": false,
                        "UpdatedOn": "2021-06-19T05:02:36.3236165",
                        "CreatedAt": "2021-06-18T21:02:03.0340469",
                        "AllowAccessResult": false,
                        "StoreIPAddress": false,
                        "Theme": null,
                        "Id": "d920190c-9bce-4e4f-af72-01cfdb48e7eb"
                    },
                    "Json": "{\n pages: [\n  {\n   name: &quot;page1&quot;,\n   elements: [\n    {\n     type: &quot;imagepicker&quot;,\n     name: &quot;question1&quot;,\n     choices: [\n      {\n       value: &quot;camel&quot;,\n       imageLink: &quot;https://surveyjs.io/Content/Images/examples/image-picker/camel.jpg&quot;\n      },\n      {\n       value: &quot;item1&quot;,\n       imageLink: &quot;https://api.surveyjs.io/private/Surveys/files?name=a9504058-e4f3-473a-962d-5b2db6ede88e&quot;\n      }\n     ]\n    }\n   ]\n  }\n ]\n}"
                },
                {
                    "Info": {
                        "Name": "Copy of Survey from sandbox",
                        "IsArchived": false,
                        "UserId": "faa9169a-c990-45c2-a063-d36659ca2808",
                        "CreatorId": "00000000-0000-0000-0000-000000000000",
                        "PostId": "2a12de36-620a-418f-8f97-0ee48db39c18",
                        "ResultId": "f538535e-3b14-4c69-9804-b73ec389c006",
                        "PublishId": null,
                        "IsPublished": null,
                        "UseCookies": false,
                        "UpdatedOn": "2021-06-13T17:18:41.914063",
                        "CreatedAt": "2021-06-13T17:18:41.0589652",
                        "AllowAccessResult": false,
                        "StoreIPAddress": false,
                        "Theme": null,
                        "Id": "6ccaeb76-9972-4c85-bf22-1c99711c603a"
                    },
                    "Json": "{\n &quot;title&quot;: &quot;mhg&quot;,\n &quot;pages&quot;: [\n  {\n   &quot;name&quot;: &quot;page1&quot;,\n   &quot;elements&quot;: [\n    {\n     &quot;type&quot;: &quot;rating&quot;,\n     &quot;name&quot;: &quot;question5&quot;\n    },\n    {\n     &quot;type&quot;: &quot;imagepicker&quot;,\n     &quot;name&quot;: &quot;question4&quot;,\n     &quot;choices&quot;: [\n      {\n       &quot;value&quot;: &quot;lion&quot;,\n       &quot;imageLink&quot;: &quot;https://surveyjs.io/Content/Images/examples/image-picker/lion.jpg&quot;\n      },\n      {\n       &quot;value&quot;: &quot;giraffe&quot;,\n       &quot;imageLink&quot;: &quot;https://surveyjs.io/Content/Images/examples/image-picker/giraffe.jpg&quot;\n      },\n      {\n       &quot;value&quot;: &quot;panda&quot;,\n       &quot;imageLink&quot;: &quot;https://surveyjs.io/Content/Images/examples/image-picker/panda.jpg&quot;\n      },\n      {\n       &quot;value&quot;: &quot;camel&quot;,\n       &quot;imageLink&quot;: &quot;https://surveyjs.io/Content/Images/examples/image-picker/camel.jpg&quot;\n      }\n     ]\n    },\n    {\n     &quot;type&quot;: &quot;radiogroup&quot;,\n     &quot;name&quot;: &quot;question3&quot;,\n     &quot;choices&quot;: [\n      &quot;item1&quot;,\n      &quot;item2&quot;,\n      &quot;item3&quot;\n     ]\n    },\n    {\n     &quot;type&quot;: &quot;checkbox&quot;,\n     &quot;name&quot;: &quot;question1&quot;,\n     &quot;choices&quot;: [\n      &quot;item1&quot;,\n      &quot;item2&quot;,\n      &quot;item3&quot;\n     ]\n    },\n    {\n     &quot;type&quot;: &quot;matrixdynamic&quot;,\n     &quot;name&quot;: &quot;question2&quot;,\n     &quot;columns&quot;: [\n      {\n       &quot;name&quot;: &quot;Column 1&quot;\n      },\n      {\n       &quot;name&quot;: &quot;Column 2&quot;\n      },\n      {\n       &quot;name&quot;: &quot;Column 3&quot;\n      }\n     ],\n     &quot;choices&quot;: [\n      1,\n      2,\n      3,\n      4,\n      5\n     ]\n    }\n   ]\n  }\n ]\n}"
                }
            ]
        }

    }

    render() {
        const survey = this.state.surveys.map((surv) => {
            return (
                <div key={surv.Info['Id']} className="col-12">
                    <Media tag="li">
                        <Media left middle>
                            <Media body className="ml-5">
                            <Survey
                                    json={surv.Json}
                                />
                               
                            </Media>
                        </Media>
                    </Media>
                </div>
            );
        });

      return (
      <div className="proj">
          <Media list>
            {survey}
          </Media>
      </div>
      )
    }
  }