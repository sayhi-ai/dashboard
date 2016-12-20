import ENV_VARS from "../../../tools/ENV_VARS"

const BASE_URL = ENV_VARS.SERVER_URL;

export default {
    GET_RESPONSES_URL: BASE_URL + '/response/response/all',
    ADD_RESPONSE_URL: BASE_URL + '/response/response/add',

    GET_RESPONSES: "GET_RESPONSES",
    ADD_RESPONSE: "ADD_RESPONSE"
}