import AppDispatcher from '../dispatchers/appDispatcher'
import BaseStore from './baseStore';
import SearchConstants from '../constants/searchConstants.js';
import assign from 'object-assign'

var CHANGE_EVENT = 'change'

var _searchTerms = {}

var SearchStore = assign({}, BaseStore, {
    getAll: function() {
        return _searchTerms;
    },
    
    updateAll(updates) {
        _searchTerms = updates
    }
});

// Register callback to handle all updates
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

        default:
        // no op
    }
})

export default SearchStore