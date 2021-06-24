import Popup from './Popup.js'

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
    }
    
    open(name, link){
    this._popupSelector.classList.remove("popup_disabled");
    document.addEventListener("keydown", super._handleEscClose.bind(this));

    const popupImage = this._popupSelector.querySelector('.popup__image');
    const popupName = this._popupSelector.querySelector('.popup__name');

    popupImage.src = link;
    popupName.textContent = name;
    popupImage.alt = name;
    }

}