export class Api {
  constructor(options) {
    this.options = options;
  }

  getInitialCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: this.options.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  getUserInfo() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: this.options.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  createCards(cardData) {
    return fetch(`${this.options.baseUrl}/cards`,  {
        method: "POST",
        headers: this.options.headers,
        body: JSON.stringify(cardData),
      }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  setUserInfo(userInfo) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify(userInfo),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
  }

  deleteCard(id) {
    return fetch(`${this.options.baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this.options.headers,
    }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      });
  }
}
