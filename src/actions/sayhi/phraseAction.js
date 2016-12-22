import AppDispatcher from '../../dispatchers/appDispatcher';
import PhraseConstants from '../../constants/sayhi/phraseConstants.js';

export const setPhrases = function(phrases) {
    AppDispatcher.dispatch({
        actionType: PhraseConstants.GET_PHRASES,
        phrases: phrases
    })
}

export const addPhrase = function(phrase) {
    AppDispatcher.dispatch({
        actionType: PhraseConstants.ADD_PHRASE,
        phrase: phrase
    })
}

export const removePhrase = function(phraseId) {
    AppDispatcher.dispatch({
        actionType: PhraseConstants.REMOVE_PHRASE,
        id: phraseId
    })
}