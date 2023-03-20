export default class Card {
  constructor(cardData, placeTemplate, handleCardClick) {
    this._placeTemplate = placeTemplate;
    this._cardData = cardData;
    this._card = this._getCard();
    this._buttonLike = this._card.querySelector(".place__icon-like");
    this._handleCardClick = handleCardClick;
  }

  getElement() {
    const newCardImage = this._card.querySelector(".place_url");
    this._setEventListeners(newCardImage);
    this._setAttributes(newCardImage);
    return this._card;
  }
  
  setButtonLike() {
    this._buttonLike.classList.toggle("place__icon-like_active");
  }

  removeCard() {
    this._card.remove();
    this._card = null;
  }

  _getCard() {
    return this._placeTemplate.firstElementChild.cloneNode(true);
  }

  _setAttributes(newCardImage) {
    newCardImage.src = this._cardData.link;
    this._card.querySelector(".place__title").textContent = this._cardData.name;
    newCardImage.alt = this._cardData.name;
  }

  _setEventListeners(newCardImage) {

    this._buttonLike.addEventListener("click", () => {
      this.setButtonLike();
    });

    this._card
    .querySelector(".place__icon-trash")
    .addEventListener("click", () => {
     this.removeCard();
    });

    newCardImage.addEventListener("click", () => {
      this._handleCardClick(this._cardData);
    });
  }
}
