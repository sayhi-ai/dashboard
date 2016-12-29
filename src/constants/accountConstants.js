import ENV_VARS from "../../tools/ENV_VARS"

const BASE_URL = ENV_VARS.SERVER_URL;

export default {
  CREATE_URL: BASE_URL + '/account/create',
  PASSWORD_RESET_EMAIL_URL: BASE_URL + '/account/password/sendcode',
  PASSWORD_RESET_URL: BASE_URL + '/account/password/reset',

  CREATE: 'CREATE',
  SET_EMAIL_FOR_RESET: 'SET_EMAIL_FOR_RESET',
}