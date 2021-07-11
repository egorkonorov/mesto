import './index.css';

import Card from "./../components/Сard.js";
import { FormValidator } from "./../components/FormValidator.js";
import Section from './../components/Section.js'
import {cardListSelector, editButton, addButton, config, popupInformationName, popupInformationDiscription} from './../utils/constants.js'
import PopupWithForm from './../components/PopupWithForm.js'
import UserInfo from './../components/UserInfo.js'
import PopupWithImage from './../components/PopupWithImage.js'
import Api from './../components/Api.js'
import PopupDelete  from './../components/PopupDelete.js'

//Функция создания карточки
function createNewCard(name, link, likes, owner){
  const card = new Card("#element-template", name, link, likes, owner, {
    handleCardClick: () => 
    {
      popupImage.open(name, link)
    }
  },
  {
    openPopupDelete: (card)=>
    {
      popupDelete.open()
      popupDelete.setEventListeners(card)
    }
  }

)

  const cardElement = card.generateCard();
  return cardElement
}

const popupDelete= new PopupDelete ('#delete', {
  deleteCard: (card) => 
      { 
        card.remove();
        popupDelete.close()
      }
    }) 



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

const userInfo = new UserInfo('.profile__name', '.profile__description', '.profile__avatar')
//Попап с формой изменения информации о пользователе
const popupInfo = new PopupWithForm('#information', {
  formSubmit: (inputValues) => 
      { 
      api.patchUserInfo(inputValues)
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






//Создание экземпляра класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: 'a9c109c0-41f8-4711-973c-118851a874e2',
    'Content-Type': 'application/json'
  }
})
//Вызов функции получени информации класса Api занесение информации через через функцию setUserInfo класса UserInfo
 api.getUserInfo()
  .then(data => {
    userInfo.setUserInfoAll(data.name, data.about, data.avatar)
  })
  .catch((err) => {
    console.log(err);
  }); 

  
//Вызов функции получения карточек класса Api занесение карточек через через renderItems класса Section
api.getInitialCards()
  .then((data) =>{
    const cardList = new Section({
      items: data,
      renderer: (item) => {
        const newCard = createNewCard(item.name, item.link, item.likes.length, item.owner.name)
        cardList.addItem(newCard);
      }
    },
    cardListSelector
    )
    cardList.renderItems();  
    //Попап с формой добавления карточки
    const popupAddPlace = new PopupWithForm('#place', {
      formSubmit: (inputValues) =>
      { 
        const userName = userInfo.getUserInfo().name
          api.postNewCard(inputValues.picture, inputValues.name )
          console.log(inputValues.picture)
          console.log(inputValues.name)
            const newCard = createNewCard(inputValues.picture, inputValues.name, "0", userName)
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
  })
  .catch((err) => {
    console.log(err);
  }); 

