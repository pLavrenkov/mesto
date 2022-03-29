export class Api {
  constructor(baseUrl, headers) {
    this._baseUrlMesto = baseUrl.baseUrlMesto;
    this._baseUrlUser = baseUrl.baseUrlUser;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrlMesto}/cards`, {
      headers: this._headers,
    }
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(obj => {
        return obj;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getUserInfo() {
    return fetch(`${this._baseUrlUser}/users/me`, {
      headers: this._headers,
    }
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  patchUserInfo(name, about) {
    return fetch(`${this._baseUrlUser}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  patchAvatar(url) {
    return fetch(`${this._baseUrlMesto}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: url
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(res => {
        return res;
      })
  }

  putNewCard(name, link) {
    return fetch(`${this._baseUrlMesto}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(obj => {
        console.log(obj);
        return obj;
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrlMesto}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  getLike() {
    return fetch(`${this._baseUrlMesto}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }


  putLike(cardId) {
    return fetch(`${this._baseUrlMesto}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrlMesto}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
}

