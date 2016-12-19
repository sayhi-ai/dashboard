import fetch from "isomorphic-fetch";
import ResponseConstants from '../../constants/sayhi/responseConstants.js';
import * as actions from '../../actions/sayhi/responseAction';
import {handleError} from '../../actions/stateAction';

export const addResponse = function (phraseId, response) {
    let token = localStorage.getItem('sayhi-jwt')
    return fetch(ResponseConstants.ADD_RESPONSE_URL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            "phraseId": phraseId,
            "response": response
        })
    }).then(response => {
        if (response.status === 200) {
            response.json().then(json => {
                if (json.added) {
                    actions.addResponse(response)
                } else {
                    actions.addResponse(null)
                }
            });
        } else {
            response.json().then(json => {
                actions.addResponse(null)
                handleError(json.error)
            });
        }
    });
}

export const fetchResponses = function (botId, phraseId) {
    let token = localStorage.getItem('sayhi-jwt')
    return fetch(ResponseConstants.GET_RESPONSES_URL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            "botId": botId,
            "phraseId": phraseId
        })
    }).then(response => {
        if (response.status === 200) {
            response.json().then(json => {
                actions.getResponses(json.responses)
            });
        } else {
            response.json().then(json => {
                handleError(json.error)
            });
        }
    });
}