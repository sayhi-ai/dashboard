import AppDispatcher from '../dispatchers/appDispatcher';
import StateConstants from '../constants/stateConstants.js';

export var changePhrase = function(phrase) {
    AppDispatcher.dispatch({
        actionType: StateConstants.UPDATE_PHRASE,
        phrase: phrase
    })
}

export var handleError = function (error) {
    AppDispatcher.dispatch({
        actionType: StateConstants.ERROR,
        error: error
    })
}