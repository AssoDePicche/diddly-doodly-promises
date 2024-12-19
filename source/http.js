import { Cookies } from "./cookies.js";

const createOptions = (method, body, authorization = false) => {
  const options = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: method,
    credentials: 'same-origin'
  };

  if (method !== "GET" && body) {
    options.body = JSON.stringify(body);
  }

  if (authorization === true) {
    options.headers.Authorization = 'Bearer ' + Cookies.contains("session");
  }

  return options;
};

export const request = async (method, url, body = null, authorization = false) => {
  const response = await fetch(url, createOptions(method, body, authorization));

  return await response.json();
};
