import AppDispatcher from '../dispatchers/appDispatcher';
import SayHiConstants from '../constants/sayhiConstants.js';

export var getPhrasesAction = function(phrases) {
    AppDispatcher.dispatch({
        actionType: SayHiConstants.GET_PHRASES,
        phrases: phrases
    })
}

export var getResponsesAction = function(responses) {
    AppDispatcher.dispatch({
        actionType: SayHiConstants.GET_RESPONSES,
        responses: responses
    })
}

export var addResponseAction = function(response) {
    AppDispatcher.dispatch({
        actionType: SayHiConstants.ADD_RESPONSE,
        response: response
    })
}

export var handleErrorAction = function (error) {
    AppDispatcher.dispatch({
        actionType: SayHiConstants.ERROR,
        error: error
    })
}