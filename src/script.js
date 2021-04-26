let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let editButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileDiscription = document.querySelector('.profile__description');
let popupName = document.querySelector('.popup__input_type_name');
let popupDiscription = document.querySelector('.popup__input_type_description');


function closeForm(){
    popup.classList.toggle('popup_disabled');
}

function openForm(){
    popupName.value = `${profileName.textContent}`;
    popupDiscription.value = `${profileDiscription.textContent}`;
    popup.classList.toggle('popup_disabled');
}


closeButton.addEventListener('click', closeForm);
editButton.addEventListener('click', openForm);


function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = `${popupName.value}`;
    profileDiscription.textContent = `${popupDiscription.value}`;
    closeForm()
}

popupForm.addEventListener('submit', formSubmitHandler);
