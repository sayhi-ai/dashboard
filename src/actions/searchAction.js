import AppDispatcher from '../dispatchers/appDispatcher';
import SearchConstants from '../constants/searchConstants.js';

export var searchTerms = function (terms) {
    let results
    if (terms[0] !== "") {
        results = [{
            type: "key",
            name: terms[0]
        }, {
            type: "persona",
            name: terms[0]
        }]
    } else {
        results = [{}]
    }
    
    AppDispatcher.dispatch({
        actionType: SearchConstants.UPDATE_SEARCH_RESULTS,
        results: results
    })
}

export var updateResults = function (results) {
    AppDispatcher.dispatch({
        actionType: SearchConstants.UPDATE_SEARCH_RESULTS,
        results: [{
            type: "key",
            name: "this is a key"
        }, {
            type: "persona",
            name: "this is a persona"
        }]
    });
}