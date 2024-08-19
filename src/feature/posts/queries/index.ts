async function reqest(
  input: string | URL | Request,
  init?: RequestInit,
) {
  return fetch(input, init).then(async (res) => {
    if (res.ok) return res;
    else throw new Error((await res.json())?.message || res.statusText)
  })
}

export async function createNew(newPost: FormData) {
  return reqest('/api/post', {
    method: 'post',
    body: newPost
  }).then((res) => res.json());
}