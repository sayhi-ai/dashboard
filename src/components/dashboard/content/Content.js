import React from 'react';
import ResponseContainer from "./response/ResponseContainer"
import persona from "../../../resources/img/persona.svg"
import Divider from 'material-ui/Divider';

export default class Content extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="content-div">
        <div className="hf f1 pa4 btc" style={{background: "white"}}>Responses</div>
        <Divider/>
        {this.props.children}
      </div>
    );
  }
}