import ENV_VARS from "../../tools/ENV_VARS"

const BASE_URL = ENV_VARS.SERVER_URL;

export default {
    GET_PHRASES_URL: BASE_URL + '/getphrases',
    GET_RESPONSES_URL: BASE_URL + '/getresponses',
    ADD_RESPONSE_URL: BASE_URL + '/addresponse',
    GET_PHRASES: "GET_PHRASES",
    GET_RESPONSES: "GET_RESPONSES",
    ADD_RESPONSE: "ADD_RESPONSE",
    ERROR: "ERROR"
}