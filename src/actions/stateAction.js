import AppDispatcher from '../dispatchers/appDispatcher';
import StateConstants from '../constants/stateConstants.js';

export const changePhrase = function(phrase) {
    AppDispatcher.dispatch({
        actionType: StateConstants.UPDATE_PHRASE,
        phrase: phrase
    })
}