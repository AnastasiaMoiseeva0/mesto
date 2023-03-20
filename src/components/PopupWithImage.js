import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popup) {
      super(popup);
      this._popupCaption = document.querySelector(".popup__caption");
      this._popupPhoto = document.querySelector(".popup__photo");
    }
  
    open(cardData) {
      super.open();
      this._popupCaption.textContent = cardData.name;
      this._popupPhoto.src = cardData.link;
      this._popupPhoto.alt = cardData.name;
    }
  }  