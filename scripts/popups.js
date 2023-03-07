export { ImagePopup, EditProfilePopup, NewCardPopup };
import {Card} from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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
  constructor(popup, config, form) {
    super(popup);
    this._config = config;
    this._form = form;
    
    this._validator = new FormValidator(this._form, this._config);
    this._validator.enable();
  }

  open() {
    super.open();

    this._validator.toggleButtonState();
    this._validator.resetValidation();
  }

  _addEventListeners() {
    super._addEventListeners();
    this._popupElement.addEventListener("submit", (evt) => { this._onSubmit(evt); }); //Обработка событий сохранения изменений
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._popupElement.removeEventListener("submit", (evt) => { this._onSubmit(evt); }); //Обработка событий сохранения изменений
  }

  _onSubmit(evt) {
    evt.preventDefault();
  }
}

class EditProfilePopup extends EditablePopup {
  constructor(popup, config) {
    super(popup, config, popup.querySelector(".edit-form_profile"));
    this._nameInput = popup.querySelector(".edit-form__field_name-input");
    this._jobInput = popup.querySelector(".edit-form__field_job-input"); 
    this._profileName = document.querySelector(".profile__name");
    this._profileProfession = document.querySelector(".profile__profession");
  }
  
  open() {
    super.open();
    this._nameInput.value = this._profileName.textContent;
    this._jobInput.value = this._profileProfession.textContent;
  }

  _onSubmit(evt) {
    super._onSubmit(evt);
    const name = this._nameInput.value;
    const job = this._jobInput.value; 

    this._profileName.textContent = name;
    this._profileProfession.textContent = job;
    this.close();
  }
}

class NewCardPopup extends EditablePopup {
  constructor(popup, config, placeTemplate, imagePopup, placesContainer) {
    super(popup, config, document.querySelector(".edit-form_card"));
    this._placeTitleInput = popup.querySelector(".edit-form__field_title-input");
    this._urlInput = document.querySelector(".edit-form__field_url-input");
    this._placesContainer = placesContainer;
    this._placeTemplate = placeTemplate;
    this._imagePopup = imagePopup;
  }

  open() {
    super.open();
    this._form.reset();
  }

  _onSubmit(evt) {
    super._onSubmit(evt);
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
