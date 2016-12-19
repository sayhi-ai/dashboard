import AppDispatcher from '../../dispatchers/appDispatcher';
import BotConstants from '../../constants/sayhi/botConstants.js';

export const addBot = function(name, type, description) {
    AppDispatcher.dispatch({
        actionType: BotConstants.ADD_BOT,
        name: name,
        type: type,
        description: description
    })
}