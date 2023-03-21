export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._closeButton = this._popupElement.querySelector(".popup__close");

    this._mousedownHandler = this._mousedownHandler.bind(this);
    this._keyHandlerEsc = this._keyHandlerEsc.bind(this);
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
    document.addEventListener("keydown", this._keyHandlerEsc);
    this._closeButton.addEventListener("click", this.close);
    this._popupElement.addEventListener("mousedown", this._mousedownHandler);
  }

  _removeEventListeners() {
    document.removeEventListener("keydown", this._mousedownHandler);
    document.removeEventListener("keydown", this._keyHandlerEsc);
    this._closeButton.removeEventListener("click", this.close);
    this._popupElement.removeEventListener("mousedown", this._mousedownHandler);
  }

  /** Функция закрытия попапа при нажатии на кнопку esc */
  _keyHandlerEsc(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  /** Функция закрытия попапа при нажатии на кнопку х или overlay */
  _mousedownHandler(evt) {
    if (evt.target === this._popupElement) {
      this.close();
    }
  }
}
