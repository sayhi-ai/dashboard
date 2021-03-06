import AppDispatcher from '../../dispatchers/appDispatcher';
import PhraseConstants from '../../constants/sayhi/phraseConstants.js';

export const setPhrases = (phrases) => {
  AppDispatcher.dispatch({
    actionType: PhraseConstants.SET_PHRASES,
    phrases: phrases
  })
}

export const addPhrase = (phrase) => {
  AppDispatcher.dispatch({
    actionType: PhraseConstants.ADD_PHRASE,
    phrase: phrase
  })
}

export const updatePhrase = (phrase) => {
  AppDispatcher.dispatch({
    actionType: PhraseConstants.UPDATE_PHRASE,
    phrase: phrase
  })
}

export const removePhrase = (phraseId) => {
  AppDispatcher.dispatch({
    actionType: PhraseConstants.REMOVE_PHRASE,
    id: phraseId
  })
}