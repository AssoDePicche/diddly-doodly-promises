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

export const cookie = (name) => {
  if (!document.cookie) {
    return null;
  }

  const cookies = document.cookie.split('; ');

  const pattern = encodeURIComponent(name) + '=';

  for (const cookie of cookies) {
    if (cookie.startsWith(pattern)) {
      return decodeURIComponent(cookie.slice(pattern.length));
    }
  }

  return null;
};

export const request = async (method, url, body = null) => {
  const response = await fetch(url, createOptions(method, body));

  return await response.json();
};
