export const getCards = () => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-2/cards', {
      headers: {
        authorization: '46247d38-ec87-463c-9f64-1af8e2f1c203',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((result) => {
        return result;
      }); 
}

export const getUser = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-2/users/me ', {
    method: 'GET',
    headers: {
      authorization: '46247d38-ec87-463c-9f64-1af8e2f1c203',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then((result) => {
    return result;
  });
}

export const createNewCard = (data) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-2/cards', {
    method: 'POST',
    headers: {
      authorization: '46247d38-ec87-463c-9f64-1af8e2f1c203',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  })
  .then((res) => {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });

}

export const updateUser = (data) => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-2/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '46247d38-ec87-463c-9f64-1af8e2f1c203',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
  .then((res) => {
  if(res.ok) {
      return res.json();
  } else {
      return Promise.reject(`Ошибка: ${res.status}`);
  }
  });
}

export const updateUserAvatar = (data) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-2/users/me/avatar', {
  method: 'PATCH',
  headers: {
    authorization: '46247d38-ec87-463c-9f64-1af8e2f1c203',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    avatar: data
  })
})
.then((res) => {
  if(res.ok) {
      return res.json();
  } else {
      return Promise.reject(`Ошибка: ${res.status}`);
  }
  });
}
  
export const deleteCardApi = (cardId) => {
return fetch(`https://nomoreparties.co/v1/wff-cohort-2/cards/${cardId}`, {
  method: 'DELETE',
  headers: {
    authorization: '46247d38-ec87-463c-9f64-1af8e2f1c203',
    'Content-Type': 'application/json'
  }
})
.then((res) => {
  if(res.ok) {
      return res.json();
  } else {
      return Promise.reject(`Ошибка: ${res.status}`);
  }
  });
}

export const deleteLike = (cardId) => {
return fetch(`https://nomoreparties.co/v1/wff-cohort-2/cards/likes/${cardId}`, {
  method: 'DELETE',
  headers: {
    authorization: '46247d38-ec87-463c-9f64-1af8e2f1c203',
    'Content-Type': 'application/json'
  }
})
.then((res) => {
  if(res.ok) {
      return res.json();
  } else {
      return Promise.reject(`Ошибка: ${res.status}`);
  }
  });
}

export const AddLike = (cardId) => {
return fetch(`https://nomoreparties.co/v1/wff-cohort-2/cards/likes/${cardId}`, {
  method: 'PUT',
  headers: {
    authorization: '46247d38-ec87-463c-9f64-1af8e2f1c203',
    'Content-Type': 'application/json'
  }
})
.then((res) => {
  if(res.ok) {
      return res.json();
  } else {
      return Promise.reject(`Ошибка: ${res.status}`);
  }
  });
}