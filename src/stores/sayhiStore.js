import AppDispatcher from '../dispatchers/appDispatcher'
import BaseStore from './baseStore';
import SayHiConstants from '../constants/sayhiConstants.js';
import assign from 'object-assign'

var _data = [{}]

var SayHiStore = assign({}, BaseStore, {
    setData(data) {
        _data = data
    },

    getData() {
        return _data
    }
});

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case SayHiConstants.DISTRIBUTE_DATA:
            if (action.data) {
                SayHiStore.setData(action.data)
                SayHiStore.emitChange()
            }
            break

        case SayHiConstants.ADD_RESPONSE:
            if (action.responseData) {
                //SayHiStore.setPersona(action.responseData)
                //SayHiStore.emitChange()
            }
            break

        default:
        // no op
    }
})

export default SayHiStore