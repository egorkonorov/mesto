const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDiscription = document.querySelector('.profile__description');
const popupName = document.querySelector('.popup__input_type_name');
const popupDiscription = document.querySelector('.popup__input_type_description');

const addButtonPlace = document.querySelector('.profile__add-button')
const closeButtonPlace = document.querySelector('.popup-place__close-button')
const popupPlace = document.querySelector('.popup-place')
const popupPlacePicture = document.querySelector('.popup-place__input_type_picture')
const popupPlaceName = document.querySelector('.popup-place__input_type_name')
const popupPlaceForm = document.querySelector('.popup-place__form')

const popupPictureImage = document.querySelector('.popup-picture__image')
const popupPictureName = document.querySelector('.popup-picture__name')
const popupPictureCloseButton = document.querySelector('.popup-picture__close-button')

const popupPicture = document.querySelector('.popup-picture')

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
function closeFormPlace(){
    popupPlace.classList.toggle('popup-place_disabled');
    popupPlace.style.animation = 'nonvision 0.3s linear'
}
function openFormPlace(){
    popupPlace.classList.toggle('popup-place_disabled');
    popupPlace.style.animation = 'vision 0.3s linear'
}

function closePopupPicture(){
  popupPicture.classList.toggle('popup-picture_disabled')
  popupPicture.style.animation = 'nonvision 0.3s linear'
}

function openPopupPicture(){
  popupPicture.classList.toggle('popup-picture_disabled')
  popupPicture.style.animation = 'vision 0.3s linear'
}



closeButton.addEventListener('click', closeForm);
editButton.addEventListener('click', openForm);
addButtonPlace.addEventListener('click',openFormPlace)
closeButtonPlace.addEventListener('click', closeFormPlace)
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



function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = `${popupName.value}`;
    profileDiscription.textContent = `${popupDiscription.value}`;
    closeForm()
}


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

//Добавление элемента на страницу
function addElement(){
const newElement = document.createElement('div')
newElement.classList.add('elements__element')

const newPicture = document.createElement('img')
newPicture.setAttribute('alt', 'Картинка профиля')
newPicture.classList.add('elements__picture')
newElement.prepend(newPicture)

const newTrash = document.createElement('img')
newTrash.classList.add('elements__trash')
newTrash.setAttribute('src', './images/Trash-ico.svg')
newTrash.setAttribute('alt', 'Корзина')
newElement.append(newTrash)

const newBoard = document.createElement('div')
newBoard.classList.add('elements__board')
newElement.append(newBoard)

const newName = document.createElement('h2')
newBoard.prepend(newName)
newName.classList.add('elements__name')

const newLike = document.createElement('button')
newLike.classList.add('elements__like')
newLike.setAttribute('type', 'button')
newBoard.append(newLike)


const elements = document.querySelector('.elements')
elements.prepend(newElement)
newName.textContent = `${popupPlaceName.value}`
newPicture.setAttribute('src', `${popupPlacePicture.value}`)
}



function formPlaceSubmitHandler (evt) {
  evt.preventDefault();
  addElement()
  closeFormPlace()
  like()
  popupPictureOpen()
}

popupForm.addEventListener('submit', formSubmitHandler);
popupPlaceForm.addEventListener('submit', formPlaceSubmitHandler)

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

let i = 0;
elementsPicture.forEach(function(item){
    item.src = initialCards[i].link;
    i+=1;
});

let n = 0
elementsName.forEach(function(item){
    item.textContent = initialCards[n].name;
    n+=1;
});

