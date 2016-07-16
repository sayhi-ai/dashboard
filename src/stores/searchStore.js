import AppDispatcher from '../dispatchers/appDispatcher'
import BaseStore from './baseStore';
import SearchConstants from '../constants/searchConstants.js';
import assign from 'object-assign'

var _phrase = ""
var _persona = ""

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

        default:
        // no op
    }
})

export default SearchStore