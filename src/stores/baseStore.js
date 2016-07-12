import AppDispatcher from '../dispatchers/appDispatcher';
import EventEmitter from 'events';

const CHANGE_EVENT = 'change'

export default class BaseStore extends EventEmitter {
    constructor(actionSubscribe) {
        super()
        this._dispatchToken = AppDispatcher.register(actionSubscribe())
    }

    dispatchToken() {
        return this._dispatchToken
    }

    emitChange() {
        this.emit(CHANGE_EVENT)
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback)
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    }
}