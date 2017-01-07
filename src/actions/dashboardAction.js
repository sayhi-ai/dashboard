import AppDispatcher from '../dispatchers/appDispatcher';
import StateConstants from '../constants/stateConstants.js';

export const changeBot = (bot) => {
  AppDispatcher.dispatch({
    actionType: StateConstants.UPDATE_PHRASE,
    bot: bot
  })
};

export const changePhrase = (phrase) => {
  AppDispatcher.dispatch({
    actionType: StateConstants.UPDATE_PHRASE,
    phrase: phrase
  })
};