const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
  headers: {
    authorization: '46247d38-ec87-463c-9f64-1af8e2f1c203',
    'Content-Type': 'application/json'
  }
};

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    }).then(getResponse);
}

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers,
  }).then(getResponse);
}

export const createNewCard = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  }).then(getResponse);
}

export const updateUser = (data) => {
    return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  }).then(getResponse);
}

export const updateUserAvatar = (data) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    avatar: data
  })
}).then(getResponse);
}
  
export const deleteCardApi = (cardId) => {
return fetch(`${config.baseUrl}/cards/${cardId}`, {
  method: 'DELETE',
  headers: config.headers,
}).then(getResponse);
}

export const deleteLike = (cardId) => {
return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  method: 'DELETE',
  headers: config.headers,
}).then(getResponse);
}

export const addLike = (cardId) => {
return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  method: 'PUT',
  headers: config.headers,
}).then(getResponse);
}