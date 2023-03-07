export class Card {
  constructor(cardData, placeTemplate, imagePopup) {
    this._placeTemplate = placeTemplate;
    this._cardData = cardData;
    this._imagePopup = imagePopup;
  }

  getElement() {
    const newCard = this._placeTemplate.firstElementChild.cloneNode(true);
    const newCardImage = newCard.querySelector(".place_url");
    this._setEventListeners(newCard, newCardImage);
    this._setAttributes(newCard, newCardImage);
    return newCard;
  }

  _setAttributes(newCard, newCardImage) {
    newCardImage.src = this._cardData.link;
    newCard.querySelector(".place__title").textContent = this._cardData.name;
    newCardImage.alt = this._cardData.name;
  }

  _setEventListeners(newCard, newCardImage) {
    this._addButtonLike(newCard);
    this._removeCard(newCard); 
    newCardImage.addEventListener("click", () => {
      this._imagePopup.open(this._cardData);
    });
  }

  _addButtonLike(newCard) {
    const buttonLike = newCard.querySelector(".place__icon-like");
    buttonLike.addEventListener("click", () => {
      buttonLike.classList.toggle("place__icon-like_active");
    });
  }

  _removeCard(newCard) {
    newCard.querySelector(".place__icon-trash").addEventListener("click", () => {
        newCard.remove();
      });
  }
}
