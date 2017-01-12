import AppDispatcher from '../../dispatchers/appDispatcher';
import ResponseConstants from '../../constants/sayhi/responseConstants.js';

export const setResponses = (responses)  =>{
  AppDispatcher.dispatch({
    actionType: ResponseConstants.GET_RESPONSES,
    responses: responses
  })
}

export const addResponse = (response) => {
  AppDispatcher.dispatch({
    actionType: ResponseConstants.ADD_RESPONSE,
    response: response
  })
}

export const updateResponse = (response) => {
  AppDispatcher.dispatch({
    actionType: ResponseConstants.UPDATE_RESPONSE,
    response: response
  })
}

export const removeResponse = (responseId) => {
  AppDispatcher.dispatch({
    actionType: ResponseConstants.REMOVE_RESPONSE,
    id: responseId
  })
}