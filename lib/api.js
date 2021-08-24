const post = async (resource, body, options = {}) => {
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${resource}`;
  let sessionId = undefined;
  if (typeof window !== 'undefined') {
    // request is made from client -> localStorage exists
    sessionId = localStorage.getItem('sessionId');
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'x-auth-token': sessionId,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    ...options,
  });
  if (!res.ok) {
    throw await res.json();
  }
  if (res.status === 204) {
    // no content
    return;
  }
  return res.json();
}

const get = async (resource) => {
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${resource}`;
  let sessionId = undefined;
  if (typeof window !== 'undefined') {
    // request is made from client -> localStorage exists
    sessionId = localStorage.getItem('sessionId');
  }
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'x-auth-token': sessionId,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) {
    throw await res.json();
  }
  return res.json();
}

const deleteFn = async (resource, options = {}) => {
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${resource}`;
  let sessionId = undefined;
  if (typeof window !== 'undefined') {
    // request is made from client -> localStorage exists
    sessionId = localStorage.getItem('sessionId');
  }
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'x-auth-token': sessionId,
    },
    ...options,
  });
  if (!res.ok) {
    throw await res.json();
  }
  if (res.status === 204) {
    // no content
    return;
  }
  return res.json();
}

const patch = async (resource, body, options = {}) => {
  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}${resource}`;
  let sessionId = undefined;
  if (typeof window !== 'undefined') {
    // request is made from client -> localStorage exists
    sessionId = localStorage.getItem('sessionId');
  }
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'x-auth-token': sessionId,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    ...options,
  });
  if (!res.ok) {
    throw await res.json();
  }
  if (res.status === 204) {
    // no content
    return;
  }
  return res.json();
}

const api = {
  get,
  post,
  delete: deleteFn,
  patch,
}

export default api;
