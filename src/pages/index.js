import './index.css';

import Card from "./../components/Сard.js";
import { FormValidator } from "./../components/FormValidator.js";
import Section from './../components/Section.js'
import {initialCards, cardListSelector, editButton, addButton, config, popupInformationName, popupInformationDiscription} from './../utils/constants.js'
import PopupWithForm from './../components/PopupWithForm.js'
import UserInfo from './../components/UserInfo.js'
import PopupWithImage from './../components/PopupWithImage.js'


//Функция создания карточки
function createNewCard(name, link){
  const card = new Card("#element-template", name, link, {
    handleCardClick: () => 
    {
      popupImage.open(name, link)
    }
  })
  const cardElement = card.generateCard();
  return cardElement
}


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
    const newCard = createNewCard(item.name, item.link)
    cardList.addItem(newCard);
  }
},
cardListSelector
)
cardList.renderItems(); 


const userInfo = new UserInfo('.profile__name', '.profile__description')

//Попап с формой изменения информации о пользователе
const popupInfo = new PopupWithForm('#information', {
  formSubmit: (inputValues) => 
      { 
      userInfo.setUserInfo(inputValues.naming, inputValues.description)
      popupInfo.close()
      }
    }
  )
  
popupInfo.setEventListeners()

editButton.addEventListener("click", () => {
  popupInfo.open()
  popupInformationName.value = userInfo.getUserInfo().name;
  popupInformationDiscription.value = userInfo.getUserInfo().information;
})


//Попап с формой добавления карточки
const popupAddPlace = new PopupWithForm('#place', {
  formSubmit: (inputValues) =>
  {
        const newCard = createNewCard(inputValues.picture, inputValues.name)
        popupAddPlace.close()
        cardList.addItem(newCard);
  }
},
)
popupAddPlace.setEventListeners()

addButton.addEventListener("click", function () {
  popupAddPlace.open()
  formValidatorPlace.toggleButtonState();
});


