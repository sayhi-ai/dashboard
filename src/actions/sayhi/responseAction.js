import AppDispatcher from '../../dispatchers/appDispatcher';
import ResponseConstants from '../../constants/sayhi/responseConstants.js';

export const setResponses = function(responses) {
    AppDispatcher.dispatch({
        actionType: ResponseConstants.GET_RESPONSES,
        responses: responses
    })
}

export const addResponse = function(response) {
    AppDispatcher.dispatch({
        actionType: ResponseConstants.ADD_RESPONSE,
        response: response
    })
}

export const removeResponse = function(responseId) {
    AppDispatcher.dispatch({
        actionType: ResponseConstants.REMOVE_RESPONSE,
        id: responseId
    })
}