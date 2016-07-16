import AppDispatcher from '../dispatchers/appDispatcher';
import SearchConstants from '../constants/searchConstants.js';

export var updateData = function(phrase) {
    AppDispatcher.dispatch({
        actionType: SearchConstants.UPDATE_PHRASE,
        phrase: phrase
    })
}

export var addResponse = function(persona) {
    AppDispatcher.dispatch({
        actionType: SearchConstants.UPDATE_PERSONA,
        persona: persona
    })
}