export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];


export const cardListSelector = ".elements"

export const popupPicture = document.querySelector(".popup_picture");
export const popupPlace = document.querySelector("#place");
export const popupPlaceName = popupPlace.querySelector(".popup__input_type_name");
export const popupPlacePicture = popupPlace.querySelector(
  ".popup__input_type_picture"
);
export const popupInformation = document.querySelector("#information");
export const popupInformationName = popupInformation.querySelector(
  ".popup__input_type_name"
);
export const popupInformationDiscription = popupInformation.querySelector(
  ".popup__input_type_description"
);

export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const popupPictureImage = popupPicture.querySelector(".popup__image");
export const popupPictureName = popupPicture.querySelector(".popup__name");
export const popupInformationForm = popupInformation.querySelector(".popup__form");

export const config = { 
  inputSelector: '.popup__input', 
  submitButtonSelector: '.popup__submit-button', 
  inactiveButtonClass: 'popup__submit-button_inactive', 
  inputErrorClass: 'popup__input_type_error', 
  errorClass: 'popup__input-error_active' 
} 
