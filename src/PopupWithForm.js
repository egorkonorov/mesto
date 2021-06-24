import Popup from './Popup.js'

export default class PopupWithForm extends Popup{
    constructor(popupSelector, {formSubmit}){
        super(popupSelector)
        this._formSubmit = formSubmit
    }
    _getInputValues(){
        const popupInputs = Array.from(
            this._popupSelector.querySelectorAll('.popup__input')
          );
        popupInputs.forEach((item) => {
            return item.value
        })  
    }
    setEventListeners(){
        const popupCloseButton = this._popupSelector.querySelector('.popup__close-button')
        popupCloseButton.addEventListener("click",  () => {
        this.close();
        })
        const popupForm = this._popupSelector.querySelector('.popup__form')
        popupForm.addEventListener("submit", (evt) =>{
            evt.preventDefault();
            this._formSubmit()
        })
    }
    close(){
        this._popupSelector.classList.add("popup_disabled");
        document.removeEventListener("keydown", super._handleEscClose.bind(this));
        const popupForm = this._popupSelector.querySelector('.popup__form')
        popupForm.reset()
    }
}
