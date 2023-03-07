export { PopupWithImage, PopupWithForm };
import {Card} from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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
  constructor(popup, config, form, onSubmit, onOpen) {
    super(popup);
    this._config = config;
    this._form = form;
    this._onSubmit = this._onSubmit.bind(this);
    this._onOpenCallBack = onOpen;
    this._onSubmitCallback = onSubmit;
    
    this._validator = new FormValidator(this._form, this._config);
    this._validator.enable();
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

// class EditProfilePopup extends PopupWithForm {
//   constructor(popup, config) {
//     super(popup, config, popup.querySelector(".edit-form_profile"));
//     this._nameInput = popup.querySelector(".edit-form__field_name-input");
//     this._jobInput = popup.querySelector(".edit-form__field_job-input"); 
//     this._profileName = document.querySelector(".profile__name");
//     this._profileProfession = document.querySelector(".profile__profession");
//   }
  
//   open() {
//     this._nameInput.value = this._profileName.textContent;
//     this._jobInput.value = this._profileProfession.textContent;
//     super.open();
//   }

//   _onSubmit(evt) {
//     super._onSubmit(evt);
//     const name = this._nameInput.value;
//     const job = this._jobInput.value; 

//     this._profileName.textContent = name;
//     this._profileProfession.textContent = job;
//     this.close();
//   }
// }

// class NewCardPopup extends PopupWithForm {
//   constructor(popup, config, placeTemplate, imagePopup, placesContainer) {
//     super(popup, config, document.querySelector(".edit-form_card"));
//     this._placeTitleInput = popup.querySelector(".edit-form__field_title-input");
//     this._urlInput = document.querySelector(".edit-form__field_url-input");
//     this._placesContainer = placesContainer;
//     this._placeTemplate = placeTemplate;
//     this._imagePopup = imagePopup;
//   }

//   open() {
//     this._form.reset();
//     super.open();
//   }

//   _onSubmit(evt) {
//     super._onSubmit(evt);
//     const titleFromInput = this._placeTitleInput.value;
//     const linkFromInput = this._urlInput.value;
//     const cardData = { name: titleFromInput, link: linkFromInput };
//     const newCard = new Card(cardData, this._placeTemplate, this._imagePopup);
//     this._placesContainer.prepend(newCard.getElement());
//     this.close();
//   }
// }

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
