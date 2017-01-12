import middleware from 'dashboard-middleware'
import * as actions from '../../actions/sayhi/responseAction';
import {handleDashboardError} from '../../actions/errorAction';

export const fetchResponses = function (phraseId) {
  const token = localStorage.getItem('sayhi-jwt')
  return middleware.getResponseHandler().getResponses(token, phraseId, 'text')
    .then(json => actions.setResponses(json.responses))
    .catch(error => {
      handleDashboardError("Unable to fetch responses.")
    })
}

export const addResponse = function (phraseId, text, html, vars) {
  const token = localStorage.getItem('sayhi-jwt');
  return middleware.getResponseHandler().addResponse(token, phraseId, text, html, vars)
    .then(json => {
      if (json.added) {
        actions.addResponse({id: json.id, text: text})
      } else {
        handleDashboardError("Response already exists.")
      }
    })
    .catch(error => {
      handleDashboardError("Unable to add response.")
    })
}

export const updateResponse = function(responseId, text, html, vars) {
  const token = localStorage.getItem('sayhi-jwt');
  return middleware.getResponseHandler().updateResponse(token, responseId, text, html, vars)
    .then(json => {
      if (json.added) {
        return actions.updateResponse({id: json.id, text: text})
      }
      return handleDashboardError("Unable to update phrase.")
    })
    .catch(error => {
      handleDashboardError("Unable to update response.")
    })
}

export const removeResponse = function (phraseId, responseId) {
  const token = localStorage.getItem('sayhi-jwt')
  return middleware.getResponseHandler().removeResponse(token, phraseId, responseId)
    .then(json => {
      if (json.removed) {
        actions.removeResponse(responseId)
      } else {
        handleDashboardError("Error removing response.")
      }
    })
    .catch(error => {
      handleDashboardError("Unable to remove response.")
    })
}