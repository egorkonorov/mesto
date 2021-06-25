import './index.css';

import Card from "./../components/Сard.js";
import { FormValidator } from "./../components/FormValidator.js";
import Section from './../components/Section.js'
import {initialCards, CardListSelector, editButton, addButton, config} from './../utils/constants.js'
import PopupWithForm from './../components/PopupWithForm.js'
import UserInfo from './../components/UserInfo.js'
import PopupWithImage from './../components/PopupWithImage.js'

//Функция создания карточки
function newCard(cardSelector, name, link, {handleCardClick}){
  const card = new Card(cardSelector, name, link, {handleCardClick})
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
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
    newCard("#element-template", item.name, item.link, {
      handleCardClick: () => 
      {
        popupImage.open(item.name, item.link)
      }
    })
  }
},
CardListSelector
)
cardList.renderItems(); 


const userInfo = new UserInfo('.profile__name', '.profile__description')

//Попап с формой изменения информации о пользователе
const popupInfo = new PopupWithForm('#information', {
  formSubmit: (InputValues) => 
      { 
      userInfo.setUserInfo(InputValues.naming, InputValues.description)
      popupInfo.close()
      }
    },
  {
  pasteInputValues: (inputName, inputDescription) => {
    const userInformation = userInfo.getUserInfo()
      console.log(userInformation)
      inputName.value = userInformation.name
      inputDescription.value = userInformation.information
    }
  }
  )
  
popupInfo.setEventListeners()

editButton.addEventListener("click", () => {
  popupInfo.open()
  popupInfo.setInputValues()
})


//Попап с формой добавления карточки
const popupAddPlace = new PopupWithForm('#place', {
  formSubmit: (InputValues) =>
  {
        newCard("#element-template", InputValues.picture, InputValues.name, {
          handleCardClick: (name, link) => 
          {
            popupImage.open(name, link )
          }
        })
        popupAddPlace.close()
  }
},
{
  pasteInputValues: (inputName, inputDescription) => {
    const userInformation = userInfo.getUserInfo()
      inputName.value = userInformation.name
      inputDescription = userInformation.information
    }
  }
)
popupAddPlace.setEventListeners()

addButton.addEventListener("click", function () {
  popupAddPlace.open()
  formValidatorPlace._toggleButtonState();
});


