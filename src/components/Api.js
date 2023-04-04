export class Api {
  constructor(options) {
    this.options = options;
  }

  getInitialCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: this.options.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getUserInfo() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: this.options.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  createCards(cardData) {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify(cardData),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  setUserInfo(userInfo) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify(userInfo),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteCard(id) {
    return fetch(`${this.options.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.options.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  setLikeCard(id) {
    return fetch(`${this.options.baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this.options.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  

  deleteLikeCard(id) {
    return fetch(`${this.options.baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this.options.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  setNewAvatar(avatarInfo) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify(avatarInfo),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}
