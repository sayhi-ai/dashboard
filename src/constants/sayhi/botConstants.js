import ENV_VARS from "../../../tools/ENV_VARS"

const BASE_URL = ENV_VARS.SERVER_URL;

export default {
  GET_BOTS_URL: BASE_URL + '/response/bot/all',
  ADD_BOTS_URL: BASE_URL + '/response/bot/add',
  REMOVE_BOTS_URL: BASE_URL + '/response/bot/remove',

  GET_BOTS: "GET_BOTS",
  ADD_BOT: "ADD_BOT",
  REMOVE_BOT: "REMOVE_BOT"
}