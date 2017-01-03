import middleware from 'dashboard-middleware'
import * as actions from '../../actions/sayhi/botAction'
import {handleDashboardError} from '../../actions/errorAction'

export const fetchBots = function () {
  const token = localStorage.getItem('sayhi-jwt')
  return middleware.getBotHandler().getBots(token)
    .then(bots => actions.setBots(json.bots))
    .catch(error => {
      handleDashboardError("Unable to fetch bots.")
    })
}

export const addBot = function (name, type, description) {
  const token = localStorage.getItem('sayhi-jwt')
  return middleware.getBotHandler().addBot(token, name, type, description)
    .then(json => {
      if (json.added) {
        actions.addBot({
          id: json.id,
          name: name,
          type: type,
          description: description
        })
      } else {
        handleDashboardError("Bot with name already exists.")
      }
    })
    .catch(error => {
      handleDashboardError("Unable to add bot.")
    })
}

export const removeBot = function (botId) {
  const token = localStorage.getItem('sayhi-jwt')
  return middleware.getBotHandler().removeBot(token,botId)
    .then(json => {
      if (json.removed) {
        actions.removeBot(botId)
      } else {
        handleDashboardError("Error removing bot.")
      }
    })
    .catch(error => {
      handleDashboardError("Unable to remove bot.")
    })
}