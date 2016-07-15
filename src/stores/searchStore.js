import AppDispatcher from '../dispatchers/appDispatcher'
import BaseStore from './baseStore';
import SearchConstants from '../constants/searchConstants.js';
import assign from 'object-assign'

var CHANGE_EVENT = 'change'

var _searchTerms = {}
var _phrase = ""
var _persona = ""

var SearchStore = assign({}, BaseStore, {
    getAll: function() {
        return _searchTerms;
    },

    getPhrase() {
        return _phrase
    },

    getPersona() {
        return _persona
    },
    
    updateAll(updates) {
        _searchTerms = updates
    },

    setPhrase(phrase) {
        _phrase = phrase
    },
    
    setPersona(persona) {
        _persona = persona
    }
});

AppDispatcher.register(function(action) {
    let results;

    switch(action.actionType) {
        case SearchConstants.SEARCH:
            if (action.terms.length !== 0) {
                results = [{
                    type: "key",
                    name: "this is a key"
                }, {
                    type: "key",
                    name: "this is a persona"
                }]
            } else {
                results = [{}]
            }

            SearchStore.emitChange()
            break

        case SearchConstants.UPDATE_SEARCH_RESULTS:
            results = action.results
            if (results.length !== 0) {
                SearchStore.updateAll(results)
                SearchStore.emitChange()
            }
            break

        case SearchConstants.UPDATE_PHRASE:
            console.log(action.phrase)
            if (action.phrase !== "") {
                SearchStore.setPhrase(action.phrase)
                SearchStore.emitChange()
            }
            break

        case SearchConstants.UPDATE_PERSONA:
            console.log(action.persona)
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