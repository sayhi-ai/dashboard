import assign from 'object-assign';
import AppDispatcher from "../dispatchers/appDispatcher"
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change'

var BaseStore = assign({}, EventEmitter.prototype, {
    register: function(actionSubscribe) {
        this._dispatchToken = AppDispatcher.register(actionSubscribe())
    },

    dispatchToken: function() {
        return this._dispatchToken
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT)
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    }
})

export default BaseStore