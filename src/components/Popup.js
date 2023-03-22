export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._closeButton = this._popupElement.querySelector(".popup__close");

    this._handleOverlay = this._handleOverlay.bind(this);
    this._handleEscapeKey = this._handleEscapeKey.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    this._addEventListeners();
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    this._removeEventListeners();
  }

  _addEventListeners() {
    document.addEventListener("keydown", this._handleEscapeKey);
    this._closeButton.addEventListener("click", this.close);
    this._popupElement.addEventListener("mousedown", this._handleOverlay);
  }

  _removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscapeKey);
    this._closeButton.removeEventListener("click", this.close);
    this._popupElement.removeEventListener("mousedown", this._handleOverlay);
  }

  /** Функция закрытия попапа при нажатии на кнопку esc */
  _handleEscapeKey(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  /** Функция закрытия попапа при нажатии на кнопку х или overlay */
  _handleOverlay(evt) {
    if (evt.target === this._popupElement) {
      this.close();
    }
  }
}
