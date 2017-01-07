import React from 'react'
import Response from './Response'
import {fetchResponses, addResponse, removeResponse} from '../../../../services/sayhi/responseService'
import {handleDashboardError} from '../../../../actions/errorAction';
import StateStore from "../../../../stores/dashboardStore"
import ResponseStore from "../../../../stores/sayhi/responseStore"
import ENV_VARS from '../../../../../tools/ENV_VARS'
import ResponseEditor from './ResponseEditor'
import { Scrollbars } from 'react-custom-scrollbars';

export default class ResponseContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      open: false,
      snackBarColor: '',
      snackBarText: '',
      phrase: "",
      responses: []
    }
  }

  componentDidMount() {
    StateStore.addChangeListener(this._updatePhrase)
    ResponseStore.addChangeListener(this._setResponses)
  }

  componentWillUnmount() {
    StateStore.removeChangeListener(this._updatePhrase)
    ResponseStore.removeChangeListener(this._setResponses)
  }

  _setResponses = () => {
    const responses = ResponseStore.getResponses()
    this.setState({
      responses: responses
    })
  }

  _updatePhrase = () => {
    const phrase = StateStore.getCurrentPhrase()

    if (phrase.phrase !== "" && phrase.phrase !== this.state.phrase) {
      fetchResponses(phrase.id);
      this.setState({
        phrase: phrase.phrase
      })
    }
  }

  _handleAddClick(data) {
    const response = data.text

    // Check for duplicates on client first before sending request to server
    let responses = ResponseStore.getResponses().filter(r => r.text.toLowerCase() === response.toLowerCase())
    if (responses.size !== 0) {
      return handleDashboardError("Response already exists.");
    }

    if (response === "") {
      return handleDashboardError("Responses cannot be empty.")
    }

    if (response.length > ENV_VARS.CONSTANTS.MAX_RESPONSE_LENGTH) {
      return handleDashboardError("Responses can be no longer than "
        + ENV_VARS.CONSTANTS.MAX_RESPONSE_LENGTH + " characters.");
    }

    addResponse(StateStore.getCurrentPhrase().id, data.text, data.html, data.vars)
  }

  render() {
    return (
      <div className='flex'>
        <div className='w-70 pa4'>
          <div className='ma3 pa3 br2 mb0' style={{backgroundColor: '#555'}}>
            <div className='w-100 tc courier f3'>
              <span className='white'>bot.say(</span>
              <span style={{color: 'rgb(100, 215, 228)'}}>{'"' + this.state.phrase + '"'}</span>
              <span className='white'>{");"}</span>
            </div>
          </div>
          <div className='ma3 pa3 br2 mt0 pt0' style={{background: "#FAFAFA"}}>
            <Scrollbars style={{height: '50vh'}}>
              {this.state.responses.map((response, index) =>
                <Response key={index} response={response.text}
                          onDelete={() => removeResponse(StateStore.getCurrentPhrase().id, response.id)}/>
              )}
            </Scrollbars>
            <ResponseEditor
              onSubmit={this._handleAddClick.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}


