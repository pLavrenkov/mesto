export class Api {
  constructor(baseUrl, { headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    const res = fetch((this._baseUrl + '/cards'), { this._headers })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  getUserInfo() {
    const res = fetch((this._baseUrl + '/cards'), { this._headers })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  putUserInfo(name, about) {
    const res = fetch((this._baseUrl + '/users/me'), {
      method: 'PATCH',
      this._headers,
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
      }
      )
  }
}

