import React from 'react'
import Icon from '../../../app/Icon'
import StateStore from "../../../../stores/stateStore"
import ENV_VARS from '../../../../../tools/ENV_VARS'
import Paper from 'material-ui/Paper';

export default class ResponseView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      boxShadow: 1
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  _hoverBot = () => {
    this.setState({
      boxShadow: 5
    })
  }

  _unhoverBot = () => {
    this.setState({
      boxShadow: 1
    })
  }

  render() {
    const style = {
      height: 150,
      width: 150,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };

    return (
      <div className='dib'>
        <Paper style={style}
               className="pointer"
               zDepth={this.state.boxShadow}
               onMouseEnter={this._hoverBot}
               onMouseLeave={this._unhoverBot}
               circle={true}>
          <div className="pt2 mt2">
            <img
              className="db center"
              style={{width: 80, height: 80}}
              src={require('../../../../resources/img/bot-icon.jpg')}
            />
          </div>
          <div className="btf hf f5 pt2">Title</div>
        </Paper>
      </div>
    );
  }
}


