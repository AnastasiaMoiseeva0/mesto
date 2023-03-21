export default class Card {
  constructor(cardData, placeTemplate, handleCardClick) {
    this._placeTemplate = placeTemplate;
    this._cardData = cardData;
    this._card = this._getCard();
    this._buttonLike = this._card.querySelector(".place__icon-like");
    this._newCardImage = this._card.querySelector(".place_url");
    this._handleCardClick = handleCardClick;
  }

  getElement() {
    this._setEventListeners();
    this._setAttributes();
    return this._card;
  }

  _toggleLike() {
    this._buttonLike.classList.toggle("place__icon-like_active");
  }

  removeCard() {
    this._card.remove();
    this._card = null;
  }

  _getCard() {
    return this._placeTemplate.firstElementChild.cloneNode(true);
  }

  _setAttributes() {
    this._newCardImage.src = this._cardData.link;
    this._card.querySelector(".place__title").textContent = this._cardData.name;
    this._newCardImage.alt = this._cardData.name;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => {
      this._toggleLike();
    });

    this._card
      .querySelector(".place__icon-trash")
      .addEventListener("click", () => {
        this.removeCard();
      });

    this._newCardImage.addEventListener("click", () => {
      this._handleCardClick(this._cardData);
    });
  }
}
