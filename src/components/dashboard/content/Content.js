import React from 'react';
import ResponseContainer from "./response/ResponseContainer"
import persona from "../../../resources/img/persona.svg"

export default class Content extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="content-div">
        <ResponseContainer/>
      </div>
    );
  }
}