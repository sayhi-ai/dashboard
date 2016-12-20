import fetch from "isomorphic-fetch";
import PhraseConstants from '../../constants/sayhi/phraseConstants.js';
import * as actions from '../../actions/sayhi/phraseAction';
import {handleError} from '../../actions/errorAction';

export const addPhrase = function (botId, phrase) {
    let token = localStorage.getItem('sayhi-jwt')
    return fetch(PhraseConstants.ADD_PHRASES_URL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            "botId": botId,
            "phrase": phrase
        })
    }).then(response => {
        if (response.status === 200) {
            response.json().then(json => {
                if (json.added) {
                    actions.addPhrase({id: json.id, phrase: phrase})
                }
            });
        } else {
            response.json().then(json => {
                handleError(json.detail)
            });
        }
    });
}

export const fetchPhrases = function (botId) {
    let token = localStorage.getItem('sayhi-jwt')
    return fetch(PhraseConstants.GET_PHRASES_URL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            "botId": botId,
        })
    }).then(response => {
        if (response.status === 200) {
            response.json().then(json => {
                actions.getPhrases(json.phrases)
            });
        } else {
            response.json().then(json => {
                handleError(json.error)
            });
        }
    });
}