import ENV_VARS from "../../tools/ENV_VARS"

const BASE_URL = ENV_VARS.SERVER_URL;

export default {
    CREATE_URL: BASE_URL + '/account/create',

    CREATE: 'CREATE',
    ERROR: 'ERROR'
}