//Функция, которая добавляет класс с ошибкой
function showInputError(profileForm, inputElement, errorMessage, config) {
  const profileFormError = profileForm.querySelector(
    `.${inputElement.id}-error`
  );

  inputElement.classList.add(config.editFormTypeErrorClass);
  profileFormError.textContent = errorMessage;
  profileFormError.classList.add(config.editFormErrorActiveClass);
}

// Функция, которая удаляет класс с ошибкой
function hideInputError(profileForm, inputElement, config) {
  const profileFormError = profileForm.querySelector(
    `.${inputElement.id}-error`
  );

  inputElement.classList.remove(config.editFormTypeErrorClass);
  profileFormError.classList.remove(config.editFormErrorActiveClass);
  profileFormError.textContent = "";
}

// Функция, которая проверяет валидность поля
function InputValidity(profileForm, inputElement, config) {
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

function setEventListeners(profileForm, closeButton, config) {
  const inputList = Array.from(
    profileForm.querySelectorAll(config.editFormFieldSelector)
  );
  const buttonElement = profileForm.querySelector(
    config.editFormSubmitSelector
  );
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      InputValidity(profileForm, inputElement, config);
      toggleButtonState(inputList, buttonElement);
    });
  });

  closeButton.addEventListener("click", () => {
    resetValidation(profileForm, config);
  });
}

function enableValidation(config) {
  const popupList = Array.from(document.querySelectorAll(config.popupClass))
    .map((popup) => {
      return {
        profileForm: popup.querySelector(config.editFormSelector),
        closeButton: popup.querySelector(config.popupCloseButtonClass),
      };
    })
    .filter((popup) => {
      return popup.profileForm;
    });

  popupList.forEach((popup) => {
    popup.profileForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(popup.profileForm, popup.closeButton, config);
  });
}

enableValidation({
  popupClass: ".popup",
  popupCloseButtonClass: ".popup__close",
  editFormSelector: ".edit-form",
  editFormFieldSelector: ".edit-form__field",
  editFormErrorActiveClass: "edit-form__field-error_active",
  editFormTypeErrorClass: "edit-form__field_type_error",
  editFormSubmitSelector: ".edit-form__submit",
});

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//Функция включения и выключения кнопки
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("button_disabled");
  } else {
    buttonElement.classList.remove("button_disabled");
  }
}

function resetValidation(profileForm, config) {
  const resetInputValidity = Array.from(
    profileForm.querySelectorAll(config.editFormFieldSelector)
  );
  resetInputValidity.forEach((inputElement) => {
    hideInputError(profileForm, inputElement, config);
  });
}
