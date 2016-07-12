import BaseStore from './baseStore';
import SearchConstants from '../constants/searchConstants.js';

export default class SearchStore extends BaseStore {
    constructor() {
        super(() => this._registerToActions.bind(this))
        this._searchTerms = {}
    }
    
    getAll() {
        return this._searchTerms
    }

    updateAll(updates) {
        this._searchTerms = updates
    }

    _registerToActions(action) {
        let results;
        console.log("got here")
        switch(action.actionType) {
            case SearchConstants.SEARCH:
                if (action.terms.length !== 0) {
                    results = [{
                        type: "key",
                        name: "this is a key"
                    }, {
                        type: "key",
                        name: "this is a persona"
                    }]
                } else {
                    results = [{}]
                }

                this.emitChange()
                break

            case SearchConstants.UPDATE_SEARCH_RESULTS:
                results = action.results
                if (results.length !== 0) {
                    this.updateAll(results)
                    this.emitChange()
                }
                break

            default:
            // no op
        }
    }
}