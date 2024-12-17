const createOptions = (method, body) => {
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

  return options;
};

export const request = async (method, url, body = null) => {
  const response = await fetch(url, createOptions(method, body));

  return await response.json();
};
