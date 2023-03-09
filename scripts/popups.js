export { PopupWithImage, PopupWithForm };

class Popup {
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

class PopupWithForm extends Popup {
  constructor(popup, config, validator, onSubmit, onOpen) {
    super(popup);
    this._config = config;
    this._onSubmit = this._onSubmit.bind(this);
    this._onOpenCallBack = onOpen;
    this._onSubmitCallback = onSubmit;
    
    this._validator = validator;
  }

  open() {
    super.open();

    this._onOpenCallBack();

    this._validator.toggleButtonState();
    this._validator.resetValidation();
  }

  _addEventListeners() {
    super._addEventListeners();
    this._popupElement.addEventListener("submit", this._onSubmit); //Обработка событий сохранения изменений
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._popupElement.removeEventListener("submit", this._onSubmit); //Обработка событий сохранения изменений
  }

  _onSubmit (evt) {
    evt.preventDefault();
    this._onSubmitCallback();
    this.close();
  }
}

class PopupWithImage extends Popup {
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
