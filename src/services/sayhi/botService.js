import middleware from 'dashboard-middleware'
import * as actions from '../../actions/sayhi/botAction'
import {handleDashboardError} from '../../actions/errorAction'

export const fetchBots = function () {
  const token = localStorage.getItem('sayhi-jwt')
  return middleware.getBotHandler().getBots(token)
    .then(json => {
      return json.bots.map(bot => {
        bot.url = `/bot/${bot.name}`
        return bot
      })
    })
    .then(bots => actions.setBots(bots))
    .catch(error => {
      handleDashboardError("Unable to fetch bots.")
    })
}

export const addBot = function (name, description, tags) {
  const token = localStorage.getItem('sayhi-jwt')
  return middleware.getBotHandler().addBot(token, name, description, tags)
    .then(json => {
      if (json.added) {
        actions.addBot({
          id: json.id,
          name: name,
          tags: tags,
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

export const updateBot = function(botId, name, description, tags) {
  const token = localStorage.getItem('sayhi-jwt')
  return middleware.getBotHandler().updateBot(botId, name, description, tags)
    .then(json => {
      if (json.added) {
        actions.updateBot({
          id: botId,
          name: name,
          tags: tags,
          description: description
        })
      }
      return handleDashboardError("Unable to update phrase.")
    })
    .catch(error => {
      handleDashboardError("Unable to update phrase.")
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