const createOptions = (method, body, authorization) => {
  const options = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: method,
    credentials: 'include',
    mode: 'navigate'
  };

  if (method !== "GET" && body) {
    options.body = JSON.stringify(body);
  }

  if (method === "POST") {
    options.headers.Accept = 'application/json';
  }

  if (authorization) {
    options.headers.Authorization = `Bearer ${authorization}`;
  }

  return options;
};

export const request = async (method, url, body = null, authorization = null) => {
  try {
    const options = createOptions(method, body, authorization);

    const endpoint = `http://localhost:8080${url.startsWith('/') ? url : '/' + url}`;

    const response = await fetch(`${endpoint}`, options);

    console.log(response)

    const contentType = response.headers.get('Content-Type');

    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return await response.text();
  } catch (exception) {
    console.log(exception);

    return null;
  }
};
