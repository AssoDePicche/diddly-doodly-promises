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

  if (method === "POST") {
    options.headers.Accept = 'application/json';
  }

  if (authorization === true) {
    options.headers.Authorization = 'Bearer ' + Cookies.contains("session");
  }

  return options;
};

export const request = async (method, url, body = null, authorization = false) => {
  try {
  const response = await fetch(url, createOptions(method, body, authorization));

  return await response.json();
     } catch (exception) {
       console.log(exception);
       return null;
     }
};
