export class Card {
    constructor(cardData, placeTemplate, imagePopup) {
      this._placeTemplate = placeTemplate;
      this._cardData = cardData;
      this._imagePopup = imagePopup;
    }
  
    getElement() {
        const newCard = this._placeTemplate.firstElementChild.cloneNode(true);
        const newCardImage = newCard.querySelector("#urlPlace");
        this._setEventListeners(newCard, newCardImage);
        this._setAttributes(newCard, newCardImage);
        return newCard;
    }

    _setAttributes(newCard, newCardImage) {
        newCardImage.src = this._cardData.link;
        newCard.querySelector("#titlePlace").textContent = this._cardData.name;
        newCardImage.alt = this._cardData.name;
    }

    _setEventListeners(newCard, newCardImage) {
        const buttonLike = newCard.querySelector("#button-like");
        buttonLike.addEventListener("click", () => {
            buttonLike.classList.toggle("place__icon-like_active");
          });
        
          newCard.querySelector("#button-trash").addEventListener("click", () => {
            newCard.remove();
          });
        
          newCardImage.addEventListener("click", () => {
            this._imagePopup.open(this._cardData);
          });
    }
}