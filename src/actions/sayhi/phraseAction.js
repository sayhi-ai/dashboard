import AppDispatcher from '../../dispatchers/appDispatcher';
import PhraseConstants from '../../constants/sayhi/phraseConstants.js';

export var getPhrases = function(phrases) {
    AppDispatcher.dispatch({
        actionType: PhraseConstants.GET_PHRASES,
        phrases: phrases
    })
}

export var addPhrase = function(phrase) {
    AppDispatcher.dispatch({
        actionType: PhraseConstants.ADD_PHRASE,
        phrase: phrase
    })
}