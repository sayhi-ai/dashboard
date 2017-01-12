import middleware from 'dashboard-middleware'
import * as actions from '../../actions/sayhi/phraseAction';
import {handleDashboardError} from '../../actions/errorAction';
import DashboardStore from '../../stores/dashboardStore'

export const fetchPhrases = function (botId) {
  const token = localStorage.getItem('sayhi-jwt')
  return middleware.getPhraseHandler().getPhrases(token, botId)
    .then(json => {
      return json.phrases.map(phrase => {
        const bot = DashboardStore.getCurrentBot()
        phrase.url = `/bot/${bot.name}/phrase/${phrase.phrase}`
        return phrase
      })
    })
    .then(json => actions.setPhrases(json))
    .catch(error => {
      handleDashboardError("Unable to fetch phrases.")
    })
}

export const addPhrase = function (botId, phrase) {
  const token = localStorage.getItem('sayhi-jwt')
  return middleware.getPhraseHandler().addPhrase(token, botId, phrase)
    .then(json => {
      if (json.added) {
        const bot = DashboardStore.getCurrentBot()
        return actions.addPhrase({id: json.id, phrase: phrase, url: `/bot/${bot.name}/phrase/${phrase}`})
      }

      return handleDashboardError("Phrase already exists.")
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