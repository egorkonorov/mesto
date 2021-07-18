import Popup from './Popup.js'

export default class PopupDelete extends Popup{
    constructor(popupElement, {deleteCard}){
        super(popupElement)
        this._deleteCard = deleteCard
    }


    setEventListeners(){
    super.setEventListeners()
    const confirmButton = this._popupElement.querySelector('.popup__submit-button-delete');
    console.log(confirmButton)
    confirmButton.addEventListener("click", (evt) => {
        evt.preventDefault()
        this._deleteCard(card, cardId) 
    })  
    }

}