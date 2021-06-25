import Popup from './Popup.js'

export default class PopupWithImage extends Popup{
    constructor(popupElement){
        super(popupElement);
    }
    
    open(name, link){
    super.open()
    const popupImage = this._popupElement.querySelector('.popup__image');
    const popupName = this._popupElement.querySelector('.popup__name');

    popupImage.src = link;
    popupName.textContent = name;
    popupImage.alt = name;
    }

}