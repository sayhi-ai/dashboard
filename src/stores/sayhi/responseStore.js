import AppDispatcher from '../../dispatchers/appDispatcher'
import BaseStore from './../baseStore';
import ResponseConstants from '../../constants/sayhi/responseConstants';
import assign from 'object-assign'
import Immutable from 'immutable'

let _responses = Immutable.List();

const ResponseStore = assign({}, BaseStore, {
  getResponses() {
    return _responses
  }
});

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case ResponseConstants.GET_RESPONSES:
      if (action.responses.length >= 0) {
        _responses = Immutable.List(action.responses)
        ResponseStore.emitChange()
      }
      break
    case ResponseConstants.ADD_RESPONSE:
      if (action.response !== null) {
        _responses = _responses.push(action.response)
        ResponseStore.emitChange()
      }
      break
    case ResponseConstants.UPDATE_RESPONSE:
      if (action.response !== null) {
        const index = _responses.findIndex(response => response.id === action.response.id)

        if (index !== null) {
          _responses = _responses.set(index, action.response)
          ResponseStore.emitChange()
        }
      }
      break
    case ResponseConstants.REMOVE_RESPONSE:
      if (action.id !== null) {
        const index = _responses.findIndex(response => response.id === action.id)

        if (index !== null) {
          _responses = _responses.delete(index)
          ResponseStore.emitChange()
        }
      }
      break
    default:
    // no op
  }
})

export default ResponseStore