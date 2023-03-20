import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
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