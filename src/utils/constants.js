export const config = {
    popupClass: ".popup",
    popupCloseButtonClass: ".popup__close",
    editFormSelector: ".edit-form",
    editFormFieldSelector: ".edit-form__field",
    editFormErrorActiveClass: "edit-form__field-error_active",
    editFormTypeErrorClass: "edit-form__field_type_error",
    editFormSubmitSelector: ".edit-form__submit",
    buttonDisabledClass: "button_disabled",
  };

export const profileEditButton = document.querySelector(".profile__edit-button");
export const newCardButton = document.querySelector(".profile__add");
export const newAvatarButton = document.querySelector(".profile__edit-avatar");
export const popupEditForm = document.querySelector(".popup_form_edit-profile");
export const popupNewCardForm = document.querySelector(".popup_form_new-card");
export const popupImage = document.querySelector(".popup_image");
export const popupDeleteCard = document.querySelector(".popup_delete-card");
export const popupNewAvatar = document.querySelector(".popup_form_edit-avatar");
  
export const placeTemplate = document.querySelector(".place_template").content;
export const placesContainer = document.querySelector(".places");
  
export const editProfileForm = document.forms["editForm"];
export const newAvatarForm = document.forms["avatarForm"];

export const profileName = document.querySelector(".profile__name");
export const profileProfession = document.querySelector(".profile__profession");
export const avatarImage = document.querySelector(".profile__avatar");
  
export const newCardForm = document.forms["cardForm"];