import React, { Component } from "react";

import "tabler-react/dist/Tabler.css";

import { Card, Button } from "tabler-react";

export default class MyCard extends Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Card Title</Card.Title>
        </Card.Header>
        <Card.Body>
          <Button color="primary">A Button</Button>
        </Card.Body>
      </Card>
    );
  }
}
