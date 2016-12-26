import React from 'react'
import Response from './Response'
import {fetchResponses, addResponse, removeResponse} from '../../../../services/sayhi/responseService'
import {handleError} from '../../../../actions/errorAction';
import StateStore from "../../../../stores/stateStore"
import ResponseStore from "../../../../stores/sayhi/responseStore"
import ENV_VAR from '../../../../../tools/ENV_VARS'

export default class ResponseView extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            snackBarColor: '',
            snackBarText : '',
            phrase: "",
            addResponseText: '',
            responses: []
        }
    }

    componentDidMount() {
        StateStore.addChangeListener(this._updatePhrase.bind(this));
        ResponseStore.addChangeListener(this._setResponses.bind(this))
    }

    componentWillUnmount() {
        StateStore.removeChangeListener(this._updatePhrase.bind(this));
        ResponseStore.removeChangeListener(this._setResponses.bind(this))
    }
    
    _setResponses() {
        const responses = ResponseStore.getResponses();

        this.setState({
            responses: responses
        })
    }

    _updatePhrase() {
        const phrase = StateStore.getCurrentPhrase();

        if (phrase.phrase !== "" && phrase.phrase !== this.state.phrase) {
            fetchResponses(phrase.id);
            this.setState({
                phrase: phrase.phrase
            })
        }
    }

    _setAddResponseText(e) {
        this.setState({
            addResponseText: e.target.value
        })
    }

    _handleAddClick(e) {
        const response = this.state.addResponseText

        // Check for duplicates on client first before sending request to server
        let responses = ResponseStore.getResponses().filter(r => r.response === response)
        if (responses.size !== 0) {
            return handleError("Response already exists.");
        }

        if (response === "") {
            return handleError("Responses cannot be empty.")
        }

        if (response.length > ENV_VAR.CONSTANTS.MAX_RESPONSE_LENGTH) {
            return handleError("Responses can be no longer than " +
                ENV_VAR.CONSTANTS.MAX_RESPONSE_LENGTH + " characters.")
        }

        addResponse(StateStore.getCurrentPhrase().id, response)
        this.setState({
            addResponseText: ''
        })
    }

    _handleKeyPress(event) {
        if(event.key == 'Enter'){
            this._handleAddClick(event)
        }
    }

    _handleSnackBarClose() {
        this.setState({
            open: false
        })
    }

    render() {
        return (
            <div className='flex justify-center'>
                <div className='w-100' style={{maxWidth: 750}}>
                    <div className='ma3 pa3 br2' style={{backgroundColor: '#555'}}>
                        <div className='w-100 tc courier f3'>
                            <span className='white'>ai.say(</span>
                            <span style={{color: 'rgb(100, 215, 228)'}}>{'"' + this.state.phrase + '"'}</span>
                            <span className='white'>{");"}</span>
                        </div>
                    </div>
                    <div className='ma3 pa3 br2 bg-white'>
                        <div>
                        {this.state.responses.map((response, index) => 
                            <Response key={index} response={response.response} onDelete={() => removeResponse(StateStore.getCurrentPhrase().id, response.id)}/>
                        )}
                        </div>
                        <div className='flex items-center mt2 h-100 w-100 justify-stretch'>
                            <input
                                className='br-pill ba b--black pv2 ph3 ma1 outline-0 f5 flex-auto'
                                type='text'
                                placeholder='Add new response'
                                onChange={this._setAddResponseText.bind(this)}
                                onKeyDown={this._handleKeyPress.bind(this)}
                                value={this.state.addResponseText}/>
                            <div className='flex ba br-100 justify-center items-center pointer dim ml2'
                                style={{
                                    width: 36,
                                    height: 36
                                }}
                                onClick={this._handleAddClick.bind(this)}
                            >
                                +
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
