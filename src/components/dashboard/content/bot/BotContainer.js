import React from 'react'
import Bot from './Bot'
import StateStore from "../../../../stores/stateStore"
import ENV_VARS from '../../../../../tools/ENV_VARS'

export default class ResponseView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className='flex pa5 justify-left'>
        <Bot></Bot>
        <Bot></Bot>
        <Bot></Bot>
        <Bot></Bot>
        <Bot></Bot>
      </div>
    );
  }
}


