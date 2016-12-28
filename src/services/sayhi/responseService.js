import fetch from "isomorphic-fetch";
import ResponseConstants from '../../constants/sayhi/responseConstants.js';
import * as actions from '../../actions/sayhi/responseAction';
import {handleDashboardError} from '../../actions/errorAction';

export const fetchResponses = function (phraseId) {
  let token = localStorage.getItem('sayhi-jwt')
  return fetch(ResponseConstants.GET_RESPONSES_URL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      "phraseId": phraseId
    })
  }).then(response => {
    if (response.status === 200) {
      response.json().then(json => {
        actions.setResponses(json.responses)
      });
    } else {
      response.json().then(json => {
        handleDashboardError(json.error)
      });
    }
  });
}

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
  }).then(serverResponse => {
    if (serverResponse.status === 200) {
      serverResponse.json().then(json => {
        if (json.added) {
          actions.addResponse({id: json.id, response: response})
        } else {
          handleDashboardError("Response already exists.")
        }
      });
    } else {
      serverResponse.json().then(json => {
        handleDashboardError(json.error)
      });
    }
  });
}

export const removeResponse = function (phraseId, responseId) {
  let token = localStorage.getItem('sayhi-jwt')
  return fetch(ResponseConstants.REMOVE_RESPONSE_URL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      "phraseId": phraseId,
      "responseId": responseId
    })
  }).then(serverResponse => {
    if (serverResponse.status === 200) {
      serverResponse.json().then(json => {
        if (json.removed) {
          actions.removeResponse(responseId)
        } else {
          handleDashboardError("Error removing response.")
        }
      });
    } else {
      serverResponse.json().then(json => {
        actions.addResponse(null)
        handleDashboardError(json.error)
      });
    }
  });
}