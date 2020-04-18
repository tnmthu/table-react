const URL = 'https://5b0f708f3c5c110014145cc9.mockapi.io/api/nexacro-demo';

export async function create({ classes, ...other}) {
  let outData = {...other}
  const res = await fetch(URL, {
    method: 'POST',
    body: JSON.stringify(outData)
  });
  return res.json();
}

export async function retrieve() {
  const res = await fetch(URL);
  const json = await res.json();
  return json;
}

export async function update(payload) {
  console.log("api update id", payload, URL + `/${payload.id}`);
  const res = await fetch(URL + `/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    // credentials: 'same-origin',
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