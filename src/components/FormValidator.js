export default class FormValidator {
  constructor(form, config) {
    this._form = form;
    this._config = config;

    this._inputList = Array.from(
      this._form.querySelectorAll(this._config.editFormFieldSelector)
    );
    this._buttonElement = this._form.querySelector(
      this._config.editFormSubmitSelector
    );
  }

  enableValidation() {
    this._setEventListeners();
  }

  /** Функция включения и выключения кнопки */
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.buttonDisabledClass);
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.classList.remove(this._config.buttonDisabledClass);
      this._buttonElement.removeAttribute("disabled", false);
    }
  }

  /** Функция отключения валидации при повторном открытии попапа */
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._inputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  /** Функция, принимающая массив полей */
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _inputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  /** Функция, которая добавляет класс с ошибкой */
  _showInputError(inputElement, errorMessage) {
    const formError = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._config.editFormTypeErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(this._config.editFormErrorActiveClass);
  }

  /** Функция, которая удаляет класс с ошибкой */
  _hideInputError(inputElement) {
    const formError = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._config.editFormTypeErrorClass);
    formError.classList.remove(this._config.editFormErrorActiveClass);
    formError.textContent = "";
  }
}
