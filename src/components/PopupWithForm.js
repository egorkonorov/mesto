import Popup from './Popup.js'

export default class PopupWithForm extends Popup{
    constructor(popupElement, {formSubmit}, {pasteInputValues}){
        super(popupElement)
        this._formSubmit = formSubmit
        this._popupForm = this._popupElement.querySelector('.popup__form')
        this._pasteInputValues = pasteInputValues
    }
    _getInputValues(){
        const popupInputs = Array.from(
            this._popupElement.querySelectorAll('.popup__input')
          );
          this._formValues = {};
          popupInputs.forEach(input => this._formValues[input.name] = input.value);
          return this._formValues;
    }
    setInputValues(){
        const inputName = this._popupElement.querySelector('#name-input')
        const inputDescription = this._popupElement.querySelector('#description-input')
        this._pasteInputValues(inputName, inputDescription)
    }
    setEventListeners(){
        super.setEventListeners()
        this._popupForm.addEventListener("submit", (evt) =>{
            evt.preventDefault();
            this._formSubmit(this._getInputValues())
        })
    }
    close(){
        super.close()
        this._popupForm.reset()
    }
}
