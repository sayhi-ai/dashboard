import AppDispatcher from '../dispatchers/appDispatcher';
import SayHiConstants from '../constants/sayhiConstants.js';

export var distributeData = function(data) {
    AppDispatcher.dispatch({
        actionType: SayHiConstants.DISTRIBUTE_DATA,
        data: data
    })
}

export var addResponse = function(responseData) {
    AppDispatcher.dispatch({
        actionType: SayHiConstants.ADD_RESPONSE,
        responseData: responseData
    })
}