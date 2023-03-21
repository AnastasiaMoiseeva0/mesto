import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, config, validator, onSubmit, onOpen) {
    super(popup);
    this._config = config;
    this._onSubmit = this._onSubmit.bind(this);
    this._onOpenCallBack = onOpen;
    this._onSubmitCallback = onSubmit;

    this._form = this._popupElement.querySelector(config.editFormSelector);

    this._inputList =  Array.from(
      this._form.querySelectorAll(this._config.editFormFieldSelector)
    );

    this._validator = validator;
  }

  open() {
    super.open();

    if (this._onOpenCallBack) {
      this._onOpenCallBack();
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

  _getInputValues() {
    const formData = {};

    this._inputList.forEach(input => {
      formData[input.name] = input.value;
    });

    return formData;
  }

  _addEventListeners() {
    super._addEventListeners();
    this._form.addEventListener("submit", this._onSubmit); //Обработка событий сохранения изменений
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._popupElement.removeEventListener("submit", this._onSubmit); //Обработка событий сохранения изменений
  }

  _onSubmit(evt) {
    evt.preventDefault();
    
    if (this._onSubmitCallback) {
      this._onSubmitCallback(this._getInputValues());
    }

    this.close();
  }
}
