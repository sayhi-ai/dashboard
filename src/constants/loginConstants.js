import ENV_VARS from "../../tools/ENV_VARS"

const BASE_URL = ENV_VARS.SERVER_URL;

export default {
  LOGIN_URL: BASE_URL + '/login',
  SIGNUP_URL: BASE_URL + '/signup',
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  LOGIN_ERROR: 'LOGIN_ERROR'
}