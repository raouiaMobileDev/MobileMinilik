import axios from "axios";
const FIREBASEDB = "https://minilik-4e824.firebaseio.com/";

export function addCommand(data) {
  const request = axios({
    method: "POST",
    url: `${FIREBASEDB}/Commands.json`,
    data
  }).then(response => {
    return response.data;
  });

  return {
    type: "ADD_COMMAND",
    payload: request
  };
}

export function getCommands() {
  const request = axios(`${FIREBASEDB}/Commands.json`).then(response => {
    let commands = [];

    for (let key in response.data) {
      commands.push({
        ...response.data[key],
        id: key
      });
    }
    return commands;
  });

  return {
    type: "GET_COMMANDS",
    payload: request
  };
}
