import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupCaption = this._popupElement.querySelector(".popup__caption");
    this._popupPhoto = this._popupElement.querySelector(".popup__photo");
  }

  open(cardData) {
    super.open();
    this._popupCaption.textContent = cardData.name;
    this._popupPhoto.src = cardData.link;
    this._popupPhoto.alt = cardData.name;
  }
}
