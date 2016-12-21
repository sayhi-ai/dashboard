import fetch from "isomorphic-fetch";
import BotConstants from '../../constants/sayhi/botConstants.js';
import * as actions from '../../actions/sayhi/botAction';
import {handleError} from '../../actions/errorAction';

export const fetchBots = function () {
    let token = localStorage.getItem('sayhi-jwt')
    return fetch(BotConstants.GET_BOTS_URL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({})
    }).then(response => {
        if (response.status === 200) {
            response.json().then(json => {
                actions.setBots(json.bots)
            });
        } else {
            response.json().then(json => {
                handleError(json.error)
            });
        }
    });
}

export const addBot = function (name, type, description) {
    let token = localStorage.getItem('sayhi-jwt')
    return fetch(PhraseConstants.ADD_PHRASES_URL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            "name": name,
            "type": type,
            "description": description
        })
    }).then(response => {
        if (response.status === 200) {
            response.json().then(json => {
                if (json.added) {
                    actions.addBot({
                        id: json.id,
                        name: name,
                        type: type,
                        description: description
                    })
                } else {
                    handleError("Bot with name already exists.")
                }
            });
        } else {
            response.json().then(json => {
                handleError(json.detail)
            });
        }
    });
}

export const removeBot = function (botId) {
    let token = localStorage.getItem('sayhi-jwt')
    return fetch(PhraseConstants.REMOVE_PHRASES_URL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            "botId": botId
        })
    }).then(serverResponse => {
        if (serverResponse.status === 200) {
            serverResponse.json().then(json => {
                if (json.removed) {
                    actions.removeBot(botId)
                } else {
                    handleError("Error removing bot.")
                }
            });
        } else {
            serverResponse.json().then(json => {
                handleError(json.error)
            });
        }
    });
}