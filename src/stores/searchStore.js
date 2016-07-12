import AppDispatcher from '../dispatchers/appDispatcher'
var EventEmitter = require('events').EventEmitter;
import SearchConstants from '../constants/searchConstants.js';
import assign from 'object-assign'

var CHANGE_EVENT = 'change'

var _searchTerms = {}

function updateAll(updates) {
    for (var id in _searchTerms) {
        _searchTerms[id] = assign({}, _searchTerms[id], updates)
    }
}

var SearchStore = assign({}, EventEmitter.prototype, {

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
    var results;

    switch(action.actionType) {
        case SearchConstants.UPDATE_SEARCH_RESULTS:
            results = action.text.trim()
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