let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let editButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileDiscription = document.querySelector('.profile__description');
let popupName = document.querySelector('.popup__input_type_name');
let popupDiscription = document.querySelector('.popup__input_type_description');


function closeForm(){
    document.querySelector('.popup').style.display = "none";
    document.querySelector('.popup__form').style.display = "none";
}

function openForm(){
    popupName.setAttribute('placeholder', `${profileName.textContent}`);
    popupDiscription.setAttribute('placeholder', `${profileDiscription.textContent}`);
    document.querySelector('.popup').style.display = "flex";
    document.querySelector('.popup__form').style.display = "flex";
}


closeButton.addEventListener('click', closeForm);
editButton.addEventListener('click', openForm);


function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = `${popupName.value}`;
    profileDiscription.textContent = `${popupDiscription.value}`;
    document.querySelector('.popup').style.display = "none";
    document.querySelector('.popup__form').style.display = "none";
}

popupForm.addEventListener('submit', formSubmitHandler);
