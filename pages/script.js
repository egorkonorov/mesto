let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let editButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileDiscription = document.querySelector('.profile__discription');


function closeForm(){
    popup.classList.add('popup__disabled');
    popupForm.classList.add('popup__form_disabled');
}

function openForm(){
    popup.classList.remove('popup__disabled');
    popupForm.classList.remove('popup__form_disabled');
}


closeButton.addEventListener('click', closeForm);
editButton.addEventListener('click', openForm);


let popupName = document.querySelector('.popup__input-name');
let popupDiscription = document.querySelector('.popup__input-discription');


function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = `${popupName.value}`;
    profileDiscription.textContent = `${popupDiscription.value}`;
    popup.classList.add('popup__disabled');
    popupForm.classList.add('popup__form_disabled');
}

popupForm.addEventListener('submit', formSubmitHandler);
