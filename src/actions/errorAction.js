import AppDispatcher from '../dispatchers/appDispatcher';
import ErrorConstants from '../constants/errorConstants.js';

export const handleError = function (error) {
    AppDispatcher.dispatch({
        actionType: ErrorConstants.ERROR,
        error: error
    })
}