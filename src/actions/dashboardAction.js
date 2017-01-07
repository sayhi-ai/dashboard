import AppDispatcher from '../dispatchers/appDispatcher';
import DashboardConstants from '../constants/dashboardConstants.js';

export const changeBot = (bot) => {
  AppDispatcher.dispatch({
    actionType: DashboardConstants.UPDATE_BOT,
    bot: bot
  })
}

export const changePhrase = (phrase) => {
  AppDispatcher.dispatch({
    actionType: DashboardConstants.UPDATE_PHRASE,
    phrase: phrase
  })
}