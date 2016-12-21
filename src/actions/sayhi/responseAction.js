import AppDispatcher from '../../dispatchers/appDispatcher';
import ResponseConstants from '../../constants/sayhi/responseConstants.js';

export var getResponses = function(responses) {
    AppDispatcher.dispatch({
        actionType: ResponseConstants.GET_RESPONSES,
        responses: responses
    })
}

export var addResponse = function(response) {
    AppDispatcher.dispatch({
        actionType: ResponseConstants.ADD_RESPONSE,
        response: response
    })
}

export var removeResponse = function(id) {
    AppDispatcher.dispatch({
        actionType: ResponseConstants.REMOVE_RESPONSE,
        id: id
    })
}