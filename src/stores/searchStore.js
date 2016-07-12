import AppDispatcher from '../dispatchers/appDispatcher'
var EventEmitter = require('events').EventEmitter;
import SearchConstants from '../constants/searchConstants.js';
import assign from 'object-assign'

var CHANGE_EVENT = 'change'

var _searchTerms = {}

function updateAll(updates) {
    _searchTerms = updates
}

var SearchStore = assign({}, EventEmitter.prototype, {
    getAll: function() {
        return _searchTerms;
    },
    
    emitChange: function() {
        this.emit(CHANGE_EVENT)
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback)
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback)
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
                updateAll(results)
                SearchStore.emitChange()
            }
            break

        default:
        // no op
    }
})

export default SearchStore