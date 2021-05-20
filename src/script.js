  
  const elementTemplate = document.querySelector('#element-template').content
  const elements = document.querySelector('.elements')
  const popupPicture = document.querySelector('.popup_picture')
  const popupPlace = document.querySelector('#place')
  const popupPlaceName = popupPlace.querySelector('.popup__input_type_name')
  const popupPlacePicture = popupPlace.querySelector('.popup__input_type_picture')
  const popupInformation = document.querySelector('#information');
  const popupInformationName = popupInformation.querySelector('.popup__input_type_name');
  const profileName = document.querySelector('.profile__name');
  const profileDiscription = document.querySelector('.profile__description');
  const popupInformationDiscription = popupInformation.querySelector('.popup__input_type_description');
  const popupInformationCloseButton = popupInformation.querySelector('.popup__close-button');
  const editButton = document.querySelector('.profile__edit-button');
  const popupPictureCloseButton = popupPicture.querySelector('.popup__close-button')
  const popupPlaceCloseButton = popupPlace.querySelector('.popup__close-button')
  const addButton = document.querySelector('.profile__add-button')
  const popupPictureImage = popupPicture.querySelector('.popup__image')
  const popupPictureName = popupPicture.querySelector('.popup__name')
  const popupInformationForm = popupInformation.querySelector('.popup__form')
  const popupPlaceForm = popupPlace.querySelector('.popup__form')
  const inputNameError = popupInformationForm.querySelector(`.popup__${popupInformationName.id}-error`)
  const inputDescriptionError = popupInformationForm.querySelector(`.popup__${popupInformationDiscription.id}-error`)
  const popup = document.querySelectorAll('.popup')

  //Функция создания карточки
  function createCard (name, link){
    //Назначение параметров карточки (ссылки и имени)
    const newCard = elementTemplate.querySelector('.elements__element').cloneNode(true)
    const newPicture = newCard.querySelector('.elements__picture')
    const newName = newCard.querySelector('.elements__name')
    newPicture.src = link
    newPicture.alt = name
    newName.textContent = name
    // Проставление лайка у новой карточки
    const newLikeButton = newCard.querySelector('.elements__like')
    newLikeButton.addEventListener('click', function(evt){
    evt.target.classList.toggle('elements__like_active');
    })
    //Удаление карточки
    const newTrashButton = newCard.querySelector('.elements__trash')
    newTrashButton.addEventListener('click', function(){
    const listItem = newTrashButton.closest('.elements__element')
    listItem.remove()
    })
    //Открытие попапа просмотра фотографии у новой карточки
    newPicture.addEventListener('click',function(){
      popupPictureImage.src = newPicture.src
      popupPictureName.textContent = newName.textContent
      popupPictureImage.alt = name
      openPopup(popupPicture)
    })
    return newCard
  }

  // Функция добавления карточки в конец
  function addCardEnd(name, link){
    elements.append(createCard(name, link))
  }

  // Функция добавления карточки в начало
  function addCardBegin(name, link){
    elements.prepend(createCard(name, link))
  }

  //Функция открытия попапа
  function openPopup(item){
    item.classList.remove('popup_disabled');
  }
  //Функция закрытия попапа
  function closePopup(item){
    item.classList.add('popup_disabled')
  }

    //Открытие и закрытие попапа изменения информации
    popupInformationCloseButton.addEventListener('click', function(){
      closePopup(popupInformation)
      hideInputError(popupInformationForm, popupInformationName)
      hideInputError(popupInformationForm, popupInformationDiscription) 
    });
    editButton.addEventListener('click', function(){
      popupInformationName.value = `${profileName.textContent}`;
      popupInformationDiscription.value = `${profileDiscription.textContent}`;
      openPopup(popupInformation)
    });

    //Отправка формы попапа изменения информации
    function submitPopupInformation (evt) {
      evt.preventDefault();
      profileName.textContent = `${popupInformationName.value}`;
      profileDiscription.textContent = `${popupInformationDiscription.value}`;
      closePopup(popupInformation)
    }
    popupInformationForm.addEventListener('submit', submitPopupInformation );


  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
  //Добавление начальных 6-ти карточек на страницу
  initialCards.forEach(function(item){
    addCardEnd(item.name, item.link)
  })

//Закрытие попапа изображения
  popupPictureCloseButton.addEventListener('click', function(){
    closePopup(popupPicture)
    hideInputError( popupPlaceForm, popupPlaceName)
    hideInputError(popupPlaceForm, popupPlacePicture) 
    popupPlaceForm.reset()
  });
  
  //Закрытие попапа добавления фотографии
  popupPlaceCloseButton.addEventListener('click',function(){
    closePopup(popupPlace)
  })


  //Открытие попапа добавления фоторафии
    addButton.addEventListener('click',function(){
      openPopup(popupPlace)
    } )


//Отправка формы попапа добавления изображения
  function submitPopupPlace (evt) {
    evt.preventDefault();
    addCardBegin(popupPlaceName.value, popupPlacePicture.value)
    closePopup(popupPlace)
    popupPlaceForm.reset()
  }
  popupPlaceForm.addEventListener('submit', submitPopupPlace );


//Закрытие попапа по оверлэю
popup.forEach(function(popupElement){
  popupElement.addEventListener('click', function(evt){
    if(evt.target === evt.currentTarget){
     closePopup(popupElement) 
    }
  })
})

//Закрытие попапа по esc
document.addEventListener('keydown', function(evt){
  if(evt.keyCode === 27){
   closePopup(popupPlace)
   closePopup(popupPicture)
   closePopup(popupInformation)
  }
})


