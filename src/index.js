import './../pages/index.css';

import Card from "./Сard.js";
import { FormValidator } from "./FormValidator.js";
import { config} from "./FormValidator.js";
import Section from './components/Section.js'
import {initialCards, CardListSelector,popupPlaceName, popupPlacePicture, popupInformationName, popupInformationDiscription, editButton, addButton} from './utils/constants.js'
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js'
import PopupWithImage from './PopupWithImage.js'

// //Закрытие попапа по оверлэю
// popups.forEach(function (popupElement) {
//   popupElement.addEventListener("click", function (evt) {
//     if (evt.target === evt.currentTarget) {
//       closePopup(popupElement);
//     }
//   });
// });


//Вызов валидации форм через класс FormValidator
const formValidatorInformation = new FormValidator(
  "#form-edit-information",
  config
);
formValidatorInformation.enableValidation();

const formValidatorPlace = new FormValidator(
  "#form-edit-place",
  config
);
formValidatorPlace.enableValidation();


//Попап с картинкой
const popupImage = new PopupWithImage('#picture') 
popupImage.setEventListeners()


//Добавление начальных 6-ти карточек на страницу
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card("#element-template", item.name, item.link, {
      handleCardClick: () => 
      {
        popupImage.open(item.name, item.link)
      }
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
},
CardListSelector
)
cardList.renderItems(); 


const userInfo = new UserInfo('.profile__name', '.profile__description')
console.log(userInfo)

//Попап с формой изменения информации о пользователе
const popupInfo = new PopupWithForm('#information', {
  formSubmit: () => 
      {
      userInfo.setUserInfo(popupInformationName.value, popupInformationDiscription.value)
      popupInfo.close()
      }
    }
  )
  
popupInfo.setEventListeners()

editButton.addEventListener("click", () => {
  popupInfo.open()
})


//Попап с формой добавления карточки
const popupAddPlace = new PopupWithForm('#place', {
  formSubmit: () =>
  {
        const card = new Card("#element-template", popupPlaceName.value, popupPlacePicture.value, {
          handleCardClick: (name, link) => 
          {
            popupImage.open(name, link )
          }
        });
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
        popupAddPlace.close()
  }
}
)
popupAddPlace.setEventListeners()

addButton.addEventListener("click", function () {
  popupAddPlace.open()
});


