import assign from 'object-assign';
const EventEmitter = require('events').EventEmitter;

const CHANGE_EVENT = 'change'

const BaseStore = assign({}, EventEmitter.prototype, {
  dispatchToken: function () {
    return this._dispatchToken
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT)
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }
})

export default BaseStore