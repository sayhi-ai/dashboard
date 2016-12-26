import AppDispatcher from '../../dispatchers/appDispatcher';
import BotConstants from '../../constants/sayhi/botConstants.js';

export const setBots = function (bots) {
  AppDispatcher.dispatch({
    actionType: BotConstants.GET_BOTS,
    bots: bots
  })
}

export const addBot = function (bot) {
  AppDispatcher.dispatch({
    actionType: BotConstants.ADD_BOT,
    bot: bot
  })
}

export const removeBot = function (botId) {
  AppDispatcher.dispatch({
    actionType: BotConstants.REMOVE_BOT,
    id: botId
  })
}