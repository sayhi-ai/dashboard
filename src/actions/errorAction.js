import AppDispatcher from '../dispatchers/appDispatcher';
import ErrorConstants from '../constants/errorConstants.js';

export var handleError = function (error) {
    AppDispatcher.dispatch({
        actionType: ErrorConstants.ERROR,
        error: error
    })
}