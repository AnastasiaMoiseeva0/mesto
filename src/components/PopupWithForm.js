import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, config, validator, handleSubmit, handleOpen) {
    super(popup);
    this._config = config;
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleOpenCallBack = handleOpen;
    this._handleSubmitCallback = handleSubmit;
    this._form = this._popupElement.querySelector(config.editFormSelector);
    this._inputList =  Array.from(
      this._form.querySelectorAll(this._config.editFormFieldSelector)
    );
    this._validator = validator;

    this._buttonElement = this._form.querySelector(
      this._config.editFormSubmitSelector
    );

    this._defaultText = this._buttonElement.textContent;
  }

  open() {
    super.open();

    if (this._handleOpenCallBack) {
      this._handleOpenCallBack();
    }

    this._validator.toggleButtonState();
    this._validator.resetValidation();
  }

  close() {
    this._form.reset();
    super.close();
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setLoading(loading) {
    if(loading === true) {
      this._buttonElement.textContent = "Сохранение...";
    } else {
      this._buttonElement.textContent = this._defaultText;
    }
    
  }

  _getInputValues() {
    const formData = {};

    this._inputList.forEach(input => {
      formData[input.name] = input.value;
    });

    return formData;
  }

  _addEventListeners() {
    super._addEventListeners();
    this._form.addEventListener("submit", this._handleSubmit); //Обработка событий сохранения изменений
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener("submit", this._handleSubmit); //Обработка событий сохранения изменений
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    
    if (this._handleSubmitCallback) {
      this.setLoading(true);
      this._handleSubmitCallback(this._getInputValues());
    } 
  }
}
