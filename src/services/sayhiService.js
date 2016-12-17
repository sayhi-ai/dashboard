import fetch from "isomorphic-fetch";
import SayHiConstants from "../constants/sayhiConstants"
import {addResponseAction, getPhrasesAction, getResponsesAction, handleErrorAction} from '../actions/sayhiAction';

export var addResponse = function (phrase, text) {
    let token = localStorage.getItem('sayhi-jwt')
    return fetch(SayHiConstants.ADD_RESPONSE_URL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            "phrase": phrase,
            "response": text
        })
    }).then(response => {
        if (response.status === 200) {
            response.json().then(json => {
                addResponseAction(text)
            });
        } else {
            response.json().then(json => {
                handleErrorAction(json.error)
            });
        }
    });
}

export var fetchPhrases = function () {
    let token = localStorage.getItem('sayhi-jwt')
    return fetch(SayHiConstants.GET_PHRASES_URL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: ""
    }).then(response => {
        if (response.status === 200) {
            response.json().then(json => {
                getPhrasesAction(json.phrases)
            });
        } else {
            response.json().then(json => {
                handleErrorAction(json.error)
            });
        }
    });
}

export var fetchResponses = function (phrase) {
    let token = localStorage.getItem('sayhi-jwt')
    return fetch(SayHiConstants.GET_RESPONSES_URL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            "phrase": phrase
        })
    }).then(response => {
        if (response.status === 200) {
            response.json().then(json => {
                getResponsesAction(json.responses)
            });
        } else {
            response.json().then(json => {
                handleErrorAction(json.error)
            });
        }
    });
}