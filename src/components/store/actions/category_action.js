import axios from "axios";
const FIREBASEDB = "https://minilik-4e824.firebaseio.com/";
export function getCategories() {
  const request = axios(`${FIREBASEDB}/categories.json`).then(response => {
    let categories = [];

    for (let key in response.data) {
      categories.push({
        ...response.data[key],
        id: key
      });
    }
    return categories;
  });

  return {
    type: "GET_CATEGORIES",
    payload: request
  };
}
