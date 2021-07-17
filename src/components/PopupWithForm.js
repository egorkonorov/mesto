import Popup from './Popup.js'

export default class PopupWithForm extends Popup{
    constructor(popupElement, {formSubmit}){
        super(popupElement)
        this._formSubmit = formSubmit
        this._popupForm = this._popupElement.querySelector('.popup__form')
        this._submitButton = this._popupElement.querySelector('.popup__submit-button')
    }
    _getInputValues(){
        const popupInputs = Array.from(
            this._popupElement.querySelectorAll('.popup__input')
          );
          this._formValues = {};
          popupInputs.forEach(input => this._formValues[input.name] = input.value);
          return this._formValues;
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
    renderLoading(isLoading){
        if (isLoading) {
            this._submitButton.textContent = 'Сохранение...'
          } else {
            this._submitButton.textContent = 'Сохранить'
          }
    }

}
