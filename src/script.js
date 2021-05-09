  //Добавление начальных 6-ти карточек на страницу
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
  initialCards.forEach(function(item){
    const elementTemplate = document.querySelector('#element-template').content
    const newElement = elementTemplate.querySelector('.elements__element').cloneNode(true)
    const newPicture = newElement.querySelector('.elements__picture')
    const newName = newElement.querySelector('.elements__name')
    const elements = document.querySelector('.elements')
    newPicture.src = item.link
    newName.textContent = item.name
    elements.append(newElement)
  })

  //Добавление элемента на страницу
  const place = document.querySelector('#place')
  const popupPlacePicture = place.querySelector('.popup__input_type_picture')
  const popupPlaceName = place.querySelector('.popup__input_type_name')
    function addElement(){
      const elementTemplate = document.querySelector('#element-template').content
      const newElement = elementTemplate.querySelector('.elements__element').cloneNode(true)
      const newPicture = newElement.querySelector('.elements__picture')
      const newName = newElement.querySelector('.elements__name')
      const elements = document.querySelector('.elements')
      newPicture.src = popupPlacePicture.value
      newName.textContent = popupPlaceName.value
      elements.prepend(newElement)

      //Открытие попапа просмотра фотографии у новой карточки
      newPicture.addEventListener('click',function(){
        popupPictureImage.src = newPicture.src
        const firstSibling = newPicture.nextElementSibling
        const secondSibling = firstSibling.nextElementSibling
        const firstChild = secondSibling.firstElementChild
        popupPictureName.textContent = firstChild.textContent
        openPopupPicture()
      })
      // Проставление лайка у новой карточки
        const newLikeButton = newElement.querySelector('.elements__like')
        newLikeButton.addEventListener('click', function(evt){
        evt.target.classList.toggle('elements__like_active');
        })

      //Удаление новой карточки
        const newTrashButton = newElement.querySelector('.elements__trash')
        newTrashButton.addEventListener('click', function(){
        const listItem = newTrashButton.closest('.elements__element')
        listItem.remove()
        })
  }
  
  function formPlaceSubmitHandler (evt) {
    evt.preventDefault();
    addElement()
    closeFormPlace()
  }
  const popupPlaceForm = place.querySelector('.popup__form')
  popupPlaceForm.addEventListener('submit', formPlaceSubmitHandler)

const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDiscription = document.querySelector('.profile__description');
const popupName = document.querySelector('.popup__input_type_name');
const popupDiscription = document.querySelector('.popup__input_type_description');





const picture = document.querySelector('#picture')
const popupPictureImage = picture.querySelector('.popup__image')
const popupPictureName = picture.querySelector('.popup__name')
const popupPictureCloseButton = picture.querySelector('.popup__close-button')

const popupPicture = picture.querySelector('.popup_picture')


const elementsPicture = document.querySelectorAll('.elements__picture');
const elementsName = document.querySelectorAll('.elements__name');

function closeForm(){
    popup.classList.toggle('popup_disabled');
    popup.style.animation = 'nonvision 0.3s linear'
}

function openForm(){
    popupName.value = `${profileName.textContent}`;
    popupDiscription.value = `${profileDiscription.textContent}`;
    popup.style.animation = 'vision 0.3s linear'
    popup.classList.toggle('popup_disabled');
}

const popupPlace = place.querySelector('.popup')
const addButtonPlace = document.querySelector('.profile__add-button')
const closeButtonPlace = place.querySelector('.popup__close-button')
function closeFormPlace(){
    popupPlace.classList.toggle('popup_disabled');
    popupPlace.style.animation = 'nonvision 0.3s linear'
}
function openFormPlace(){
    popupPlace.classList.toggle('popup_disabled');
    popupPlace.style.animation = 'vision 0.3s linear'
}
addButtonPlace.addEventListener('click', openFormPlace)
closeButtonPlace.addEventListener('click', closeFormPlace)



function closePopupPicture(){
  popupPicture.classList.toggle('popup_disabled')
  popupPicture.style.animation = 'nonvision 0.3s linear'
}

function openPopupPicture(){
  popupPicture.classList.toggle('popup_disabled')
  popupPicture.style.animation = 'vision 0.3s linear'
}



closeButton.addEventListener('click', closeForm);
editButton.addEventListener('click', openForm);
addButtonPlace.addEventListener('click', openFormPlace)
popupPictureCloseButton.addEventListener('click', closePopupPicture)

//Открытие попапа с картинкой
function popupPictureOpen(){
elementsPicture.forEach(function(item){
  item.addEventListener('click',function(){
    popupPictureImage.src = item.src
    const firstSibling = item.nextElementSibling
    const secondSibling = firstSibling.nextElementSibling
    const firstChild = secondSibling.firstElementChild
    popupPictureName.textContent = firstChild.textContent
    openPopupPicture()
  })
})
}
popupPictureOpen()


//Изменение имени пользователя
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = `${popupName.value}`;
    profileDiscription.textContent = `${popupDiscription.value}`;
    closeForm()
}
popupForm.addEventListener('submit', formSubmitHandler);

// Проставление лайка фотографиям
function like(){
const likeButton = document.querySelectorAll('.elements__like')
likeButton.forEach(function(like){
  like.addEventListener('click', function(evt){
    evt.target.classList.toggle('elements__like_active');
  })
})
}
like()

//Удаление элемента со страницы
function deleteElement(){
const trashButton = document.querySelectorAll('.elements__trash')
trashButton.forEach(function(item){
  item.addEventListener('click', function(){
    const listItem = item.closest('.elements__element')
    listItem.remove()
  })
})
}
deleteElement()











