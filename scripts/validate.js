/** Функция, которая добавляет класс с ошибкой */
function showInputError(profileForm, inputElement, errorMessage, config) {
  const profileFormError = profileForm.querySelector(
    `.${inputElement.id}-error`
  );

  inputElement.classList.add(config.editFormTypeErrorClass);
  profileFormError.textContent = errorMessage;
  profileFormError.classList.add(config.editFormErrorActiveClass);
}

/** Функция, которая удаляет класс с ошибкой */
function hideInputError(profileForm, inputElement, config) {
  const profileFormError = profileForm.querySelector(
    `.${inputElement.id}-error`
  );

  inputElement.classList.remove(config.editFormTypeErrorClass);
  profileFormError.classList.remove(config.editFormErrorActiveClass);
  profileFormError.textContent = "";
}

/** Функция, которая проверяет валидность поля */
function inputValidity(profileForm, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(
      profileForm,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(profileForm, inputElement, config);
  }
}

/** Функция, которая добавляет обработчики полям формы */
function setEventListeners(popup, profileForm, closeButton, config) {
  const inputList = Array.from(
    profileForm.querySelectorAll(config.editFormFieldSelector)
  );
  const buttonElement = profileForm.querySelector(
    config.editFormSubmitSelector
  );
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      inputValidity(profileForm, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

function getAllPopups(config) {
  const popupList = Array.from(document.querySelectorAll(config.popupClass))
    .map((popup) => {
      return {
        popup: popup,
        profileForm: popup.querySelector(config.editFormSelector),
        closeButton: popup.querySelector(config.popupCloseButtonClass),
      };
    })
    .filter((popup) => {
      return popup.profileForm;
    });

  return popupList;
}

/** Функция, которая включает валидацию для всех полей формы */
function enableValidation(config) {
  const popupList = getAllPopups(config);

  popupList.forEach((popup) => {
    popup.profileForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(
      popup.popup,
      popup.profileForm,
      popup.closeButton,
      config
    );
  });
}

/** Функция, принимающая массив полей */
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

/** Функция включения и выключения кнопки */
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.buttonDisabledClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(config.buttonDisabledClass);
    buttonElement.removeAttribute("disabled", false);
  }
}

/** Функция отключения валидации при повторном открытии попапа */
function resetValidation(profileForm, config) {
  const resetInputValidity = Array.from(
    profileForm.querySelectorAll(config.editFormFieldSelector)
  );
  resetInputValidity.forEach((inputElement) => {
    hideInputError(profileForm, inputElement, config);
  });
}
