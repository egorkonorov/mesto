import './index.css';

import Card from "./../components/Сard.js";
import { FormValidator } from "./../components/FormValidator.js";
import Section from './../components/Section.js'
import {cardListSelector, editButton, addButton, overlay, config, popupInformationName, popupInformationDiscription} from './../utils/constants.js'
import PopupWithForm from './../components/PopupWithForm.js'
import UserInfo from './../components/UserInfo.js'
import PopupWithImage from './../components/PopupWithImage.js'
import Api from './../components/Api.js'
import PopupDelete  from './../components/PopupDelete.js'

//Функция создания карточки
function createNewCard(name, link, likesLength, owner, user, cardId, likes){
  const card = new Card("#element-template", name, link, likesLength, owner, user, cardId, likes, {
    handleCardClick: () => 
    {
      popupImage.open(name, link)
    }
  },
  {
    openPopupDelete: (card, cardId) =>
    {
      popupDelete.open(card, cardId)
    }
  }, 
  {
    setLikeCard: (cardId) => 
    {
      api.setLikeCard(cardId)
        .then(data =>{
          card.setLikeCard(data.likes.length)
        })
        .catch((err) => {
          console.log(err);
        }); 

    }
  },
  {
    deleteLikeCard:(cardId) =>
    {
      api.deleteLikeCard(cardId)
        .then(data =>{
          card.setLikeCard(data.likes.length)
        })
        .catch((err) => {
          console.log(err);
        }); 
    }
  }

)

  const cardElement = card.generateCard();
  return cardElement
}

//Попап с вопросом удаления
const popupDelete= new PopupDelete ('#delete', {
  deleteCard: (card, cardId) => 
      { 
        api.deleteCard(cardId)
        .then(() => {
          card.remove();
          popupDelete.close()
        })
        .catch((err) => {
          console.log(err);
        });

      }
    }) 
    popupDelete.setEventListeners()
//Попап с изменением аватара
const popupAvatar = new PopupWithForm ('#avatar', {
  formSubmit: (inputValues) => 
      { 
        popupAvatar.renderLoading(true)
      api.patchUserAvatar(inputValues)
      .then(data => {
        userInfo.setUserAvatar(data.avatar)
        popupAvatar.close()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() =>{
        popupAvatar.renderLoading(false)
      })
      }
    }
  )
  popupAvatar.setEventListeners()


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

const formValidatorAvatar= new FormValidator(
  "#form-edit-avatar",
  config
);
formValidatorAvatar.enableValidation();


//Попап с картинкой
const popupImage = new PopupWithImage('#picture') 
popupImage.setEventListeners()

const userInfo = new UserInfo('.profile__name', '.profile__description', '.profile__avatar')

//Попап с формой изменения информации о пользователе
const popupInfo = new PopupWithForm('#information', {
  formSubmit: (inputValues) => 
      {
      popupInfo.renderLoading(true) 
      api.patchUserInfo(inputValues)
      .then(data => {
      userInfo.setUserInfo(data.name, data.about)
      popupInfo.close()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() =>{
        popupInfo.renderLoading(false)
      })
      }
    }
  )
  
popupInfo.setEventListeners()

//Обработка клика по кнопке изменения информации
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
    contentType:'application/json'
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
Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
  api.getUserInfo(),
  api.getInitialCards()
])
  .then((values)=>{ 
    const cardList = new Section({
      items: values[1],
      renderer: (item) => {
            const userId = values[0]._id
            const newCard = createNewCard(item.name, item.link, item.likes.length, item.owner._id, userId, item._id, item.likes)
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
        popupAddPlace.renderLoading(true) 
        const userName = userInfo.getUserInfo().name
          api.postNewCard(inputValues.picture, inputValues.name )
            .then(data => {
              const newCard = createNewCard(inputValues.picture, inputValues.name, 0, data.owner.name, userName, data._id, data.likes)
            popupAddPlace.close()
            cardList.addItem(newCard);
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() =>{
              popupAddPlace.renderLoading(false)
            })
      }
    },
    )
    popupAddPlace.setEventListeners()

    //Обработка клика по кнопке добавления фотографии
    addButton.addEventListener("click", function () {
      popupAddPlace.open()
      formValidatorPlace.toggleButtonState();
    });
  })
  .catch((err)=>{     //попадаем сюда если один из промисов завершится ошибкой
    console.log(err);
  }) 
  
  overlay.addEventListener("click", function () {
    popupAvatar.open()
    formValidatorAvatar.toggleButtonState();
  })
