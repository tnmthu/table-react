const URL = 'https://5b0f708f3c5c110014145cc9.mockapi.io/api/nexacro-demo';

export async function create(payload) {
  const res = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function retrieve() {
  const res = await fetch(URL);
  const json = await res.json();
  return json;
}

export async function update(payload) {
  const res = await fetch(URL + `/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  return json;
}

export async function del(id) {
  const res = await fetch(URL + `/${id}`, {
    method: 'DELETE'
  });
  return res.json();
}