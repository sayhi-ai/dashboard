import middleware from 'dashboard-middleware'
import * as actions from '../../actions/sayhi/phraseAction';
import {handleDashboardError} from '../../actions/errorAction';

export const fetchPhrases = function (botId) {
  const token = localStorage.getItem('sayhi-jwt')
  return middleware.getPhraseHandler().getPhrases(token, botId)
    .then(json => actions.setPhrases(json.phrases))
    .catch(error => {
      handleDashboardError("Unable to fetch phrases.")
    })
}

export const addPhrase = function (botId, phrase) {
  const token = localStorage.getItem('sayhi-jwt')
  return middleware.getPhraseHandler().addPhrase(token, botId, phrase)
    .then(json => {
      if (json.added) {
        actions.addPhrase({id: json.id, phrase: phrase})
      } else {
        handleDashboardError("Phrase already exists.")
      }
    })
    .catch(error => {
      handleDashboardError("Unable to add phrase.")
    })
}

export const removePhrase = function (phraseId) {
  const token = localStorage.getItem('sayhi-jwt')
  return middleware.getPhraseHandler().removePhrase(token, phraseId)
    .then(json => {
      if (json.removed) {
        actions.removePhrase(phraseId)
      } else {
        handleDashboardError("Error removing phrase.")
      }
    })
    .catch(error => {
      handleDashboardError("Unable to remove phrase.")
    })
}