import ENV_VARS from "../../../tools/ENV_VARS"

const BASE_URL = ENV_VARS.SERVER_URL;

export default {
    GET_PHRASES_URL: BASE_URL + '/response/phrase/all',
    ADD_PHRASES_URL: BASE_URL + '/response/phrase/add',

    GET_PHRASES: "GET_PHRASES",
    ADD_PHRASE: "ADD_PHRASE",
}