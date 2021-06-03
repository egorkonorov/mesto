import { Card } from "./Сard.js";
import { FormValidator } from "./FormValidator.js";
import { config} from "./FormValidator.js";

const elementTemplate = document.querySelector("#element-template").content;
const elements = document.querySelector(".elements");
export const popupPicture = document.querySelector(".popup_picture");
const popupPlace = document.querySelector("#place");
const popupPlaceName = popupPlace.querySelector(".popup__input_type_name");
const popupPlacePicture = popupPlace.querySelector(
  ".popup__input_type_picture"
);
const popupInformation = document.querySelector("#information");
const popupInformationName = popupInformation.querySelector(
  ".popup__input_type_name"
);
const profileName = document.querySelector(".profile__name");
const profileDiscription = document.querySelector(".profile__description");
const popupInformationDiscription = popupInformation.querySelector(
  ".popup__input_type_description"
);
const popupInformationCloseButton = popupInformation.querySelector(
  ".popup__close-button"
);
const editButton = document.querySelector(".profile__edit-button");
const popupPictureCloseButton = popupPicture.querySelector(
  ".popup__close-button"
);
const popupPlaceCloseButton = popupPlace.querySelector(".popup__close-button");
const addButton = document.querySelector(".profile__add-button");
export const popupPictureImage = popupPicture.querySelector(".popup__image");
export const popupPictureName = popupPicture.querySelector(".popup__name");
const popupInformationForm = popupInformation.querySelector(".popup__form");
const popupPlaceForm = popupPlace.querySelector(".popup__form");
const inputNameError = popupInformationForm.querySelector(
  `.popup__${popupInformationName.id}-error`
);
const inputDescriptionError = popupInformationForm.querySelector(
  `.popup__${popupInformationDiscription.id}-error`
);
const popups = document.querySelectorAll(".popup");
const popupPlaceSubmitButton = popupPlace.querySelector('.popup__submit-button')

// Функция добавления карточки в конец
// function addCardEnd(name, link){
//   const card = new Card('#element-template', name, link);
//   const cardElement = card.generateCard();
//   elements.append(cardElement)
// }

// Функция добавления карточки в начало
function addCardBegin(name, link) {
  const card = new Card("#element-template", name, link);
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
}

//Функция открытия попапа
export function openPopup(item) {
  item.classList.remove("popup_disabled");
  document.addEventListener("keydown", closePopupEsc);
}

//Функция закрытия попапа
function closePopup(item) {

  //   //Очистка ошибки у формы
  //   const formItem = item.querySelector('.popup__form')
  //   if (!(formItem === null)){
  //   const InputList = Array.from(formItem.querySelectorAll('.popup__input'))
  //   InputList.forEach((input) => {
  //   input.classList.remove('popup__input_type_error')
  //   const errorElement = formItem.querySelector(`#span-${input.id}`);
  //   errorElement.classList.remove('popup__input-error_active')
  //   errorElement.textContent = ''
  // })}

  //Закрытиe попапа, удаление слушателя кнопки ESC
  item.classList.add("popup_disabled");
  document.removeEventListener("keydown", closePopupEsc);
}

//Открытие и закрытие попапа изменения информации
popupInformationCloseButton.addEventListener("click", function () {
  closePopup(popupInformation);
});
editButton.addEventListener("click", function () {
  popupInformationName.value = `${profileName.textContent}`;
  popupInformationDiscription.value = `${profileDiscription.textContent}`;
  openPopup(popupInformation);
});

//Отправка формы попапа изменения информации
function submitPopupInformation(evt) {
  evt.preventDefault();
  profileName.textContent = `${popupInformationName.value}`;
  profileDiscription.textContent = `${popupInformationDiscription.value}`;
  closePopup(popupInformation);
}
popupInformationForm.addEventListener("submit", submitPopupInformation);

const initialCards = [
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
//Добавление начальных 6-ти карточек на страницу
initialCards.forEach((item) => {
  const card = new Card("#element-template", item.name, item.link);
  const cardElement = card.generateCard();
  elements.append(cardElement);
});

//Закрытие попапа изображения
popupPictureCloseButton.addEventListener("click", function () {
  closePopup(popupPicture);
});

//Закрытие попапа добавления фотографии
popupPlaceCloseButton.addEventListener("click", function () {
  closePopup(popupPlace);
  popupPlaceForm.reset();
});

//Открытие попапа добавления фоторафии
addButton.addEventListener("click", function () {
  openPopup(popupPlace);
});

//Отправка формы попапа добавления изображения
function submitPopupPlace(evt) {
  evt.preventDefault();
  addCardBegin(popupPlaceName.value, popupPlacePicture.value);
  closePopup(popupPlace);
  popupPlaceForm.reset();
  popupPlaceSubmitButton.classList.add('popup__submit-button_inactive');
  popupPlaceSubmitButton.setAttribute("disabled", "disabled");
}
popupPlaceForm.addEventListener("submit", submitPopupPlace);

//Закрытие попапа по оверлэю
popups.forEach(function (popupElement) {
  popupElement.addEventListener("click", function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popupElement);
    }
  });
});

//Закрытие попапа по esc
function closePopupEsc(evt) {
  if (evt.keyCode === 27) {
    const openedPopup = document.querySelector(".popup:not(.popup_disabled)");
    closePopup(openedPopup);
  }
}


//Вызов валидации форм через класс FormValidator
const formValidatorInformation = new FormValidator(
  "#form-edit-information",
  config
);
formValidatorInformation.enableValidation();

const formValidatorpPlace = new FormValidator(
  "#form-edit-place",
  config
);
formValidatorpPlace.enableValidation();
