import AppDispatcher from '../dispatchers/appDispatcher';
import SearchConstants from '../constants/searchConstants.js';

export var searchTerms = function (terms) {
    AppDispatcher.dispatch({
        actionType: SearchConstants.SEARCH,
        terms: terms
    });
}

export var updateResults = function (results) {
    AppDispatcher.dispatch({
        actionType: SearchConstants.UPDATE_SEARCH_RESULTS,
        results: results
    });
}