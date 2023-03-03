export { ImagePopup, EditProfilePopup, NewCardPopup };
import {Card} from "./Card.js";

class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._closeButton = this._popupElement.querySelector(".popup__close");
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
    document.addEventListener("keydown", (evt) => { this._keyHandlerEsc(evt); });
    this._closeButton.addEventListener("click", () => { this.close(); });
    this._popupElement.addEventListener("mousedown", (evt) => { this._mousedownHandler(evt); });
  }

  _removeEventListeners() {
    document.removeEventListener("keydown", (evt) => { this._keyHandlerEsc(evt); });
    this._closeButton.removeEventListener("click", () => { this.close(); });
    this._popupElement.removeEventListener("mousedown", (evt) => { this._mousedownHandler(evt); });
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

class EditablePopup extends Popup {
  constructor(popup, config) {
    super(popup);
    this._config = config;
  }

  open() {
    super.open();

    const inputList = Array.from(
      this._popupElement.querySelectorAll(this._config.editFormFieldSelector)
    );
    const buttonElement = this._popupElement.querySelector(
      this._config.editFormSubmitSelector
    );
    toggleButtonState(inputList, buttonElement, this._config);
    resetValidation(this._popupElement, this._config);
  }

  _addEventListeners() {
    super._addEventListeners();
    this._popupElement.addEventListener("submit", (evt) => { this._onSubmit(evt); }); //Обработка событий сохранения изменений
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._popupElement.removeEventListener("submit", (evt) => { this._onSubmit(evt); }); //Обработка событий сохранения изменений
  }

  _onSubmit() {}
}

class EditProfilePopup extends EditablePopup {
  constructor(popup, config) {
    super(popup, config);
    this._nameInput = popup.querySelector("#nameInput");
    this._jobInput = popup.querySelector("#jobInput"); 
    this._profileName = document.querySelector("#profileName");
    this._profileProfession = document.querySelector("#profileProfession");
  }
  
  open() {
    super.open();
    this._nameInput.value = this._profileName.textContent;
    this._jobInput.value = this._profileProfession.textContent;
  }

  _onSubmit(evt) {
    evt.preventDefault();

    const name = this._nameInput.value;
    const job = this._jobInput.value; 

    this._profileName.textContent = name;
    this._profileProfession.textContent = job;
    this.close();
  }
}

class NewCardPopup extends EditablePopup {
  constructor(popup, config, placeTemplate, imagePopup, placesContainer) {
    super(popup, config);
    this._placeTitleInput = popup.querySelector("#placeTitleInput");
    this._urlInput = document.querySelector("#urlInput");
    this._placesContainer = placesContainer;
    this._cardForm = document.querySelector("#cardForm");
    this._placeTemplate = placeTemplate;
    this._imagePopup = imagePopup;
  }

  open() {
    super.open();
    this._cardForm.reset();
  }

  _onSubmit(evt) {
    evt.preventDefault();
    const titleFromInput = this._placeTitleInput.value;
    const linkFromInput = this._urlInput.value;
    const cardData = { name: titleFromInput, link: linkFromInput };
    const newCard = new Card(cardData, this._placeTemplate, this._imagePopup);
    this._placesContainer.prepend(newCard.getElement());
    this.close();
  }
}

class ImagePopup extends Popup {
  constructor(popup) {
    super(popup);
    this._popupCaption = document.querySelector("#popupCaption");
    this._popupPhoto = document.querySelector("#popupPhoto");
  }

  open(cardData) {
    super.open();
    this._popupCaption.textContent = cardData.name;
    this._popupPhoto.src = cardData.link;
    this._popupPhoto.alt = cardData.name;
  }
}
