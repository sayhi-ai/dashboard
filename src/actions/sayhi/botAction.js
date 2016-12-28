import AppDispatcher from '../../dispatchers/appDispatcher';
import BotConstants from '../../constants/sayhi/botConstants.js';

export const setBots = (bots) => {
  AppDispatcher.dispatch({
    actionType: BotConstants.GET_BOTS,
    bots: bots
  })
};

export const addBot = (bot) => {
  AppDispatcher.dispatch({
    actionType: BotConstants.ADD_BOT,
    bot: bot
  })
};

export const removeBot = (botId) => {
  AppDispatcher.dispatch({
    actionType: BotConstants.REMOVE_BOT,
    id: botId
  })
};