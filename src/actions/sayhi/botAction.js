import AppDispatcher from '../../dispatchers/appDispatcher';
import BotConstants from '../../constants/sayhi/botConstants.js';

export var getBots = function() {
    AppDispatcher.dispatch({
        actionType: BotConstants.GET_BOTS,
    })
}

export const addBot = function(name, type, description) {
    AppDispatcher.dispatch({
        actionType: BotConstants.ADD_BOT,
        name: name,
        type: type,
        description: description
    })
}

export var removePhrase = function(botId) {
    AppDispatcher.dispatch({
        actionType: BotConstants.REMOVE_BOT,
        botId: botId
    })
}