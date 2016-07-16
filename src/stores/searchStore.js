import AppDispatcher from '../dispatchers/appDispatcher'
import BaseStore from './baseStore';
import SearchConstants from '../constants/searchConstants.js';
import assign from 'object-assign'

var _phrase = ""
var _persona = ""
var _allPhrases = []
var _allPersonas = []

var SearchStore = assign({}, BaseStore, {
    getPhrase() {
        return _phrase
    },

    getPersona() {
        return _persona
    },

    setPhrase(phrase) {
        _phrase = phrase
    },
    
    setPersona(persona) {
        _persona = persona
    },

    getAllPhrases() {
        return _allPhrases
    },

    getAllPersonas() {
        return _allPersonas
    },

    setAllPhrases(phrases) {
        _allPhrases = phrases
    },

    setAllPersonas(personas) {
        _allPersonas = personas
    }
});

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case SearchConstants.UPDATE_PHRASE:
            if (action.phrase !== "") {
                SearchStore.setPhrase(action.phrase)
                SearchStore.emitChange()
            }
            break

        case SearchConstants.UPDATE_PERSONA:
            if (action.persona !== "") {
                SearchStore.setPersona(action.persona)
                SearchStore.emitChange()
            }
            break

        case SearchConstants.INIT_SEARCH:
            if (action.phrases.length > 0) {
                SearchStore.setAllPhrases(action.phrases)
                SearchStore.setAllPersonas(action.personas)
                SearchStore.emitChange()
            }
            break

        default:
        // no op
    }
})

export default SearchStore