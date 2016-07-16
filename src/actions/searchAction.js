import AppDispatcher from '../dispatchers/appDispatcher';
import SearchConstants from '../constants/searchConstants.js';

export var initSearch = function(phrases, personas) {
    AppDispatcher.dispatch({
        actionType: SearchConstants.INIT_SEARCH,
        phrases: phrases,
        personas: personas
    })
}

export var changePhrase = function(phrase) {
    AppDispatcher.dispatch({
        actionType: SearchConstants.UPDATE_PHRASE,
        phrase: phrase
    })
}

export var changePersona = function(persona) {
    AppDispatcher.dispatch({
        actionType: SearchConstants.UPDATE_PERSONA,
        persona: persona
    })
}