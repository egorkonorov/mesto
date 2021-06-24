export default class Popup{
    constructor(popupSelector){
        this._popupSelector = document.querySelector(popupSelector)
    }
    open(){
        this._popupSelector.classList.remove("popup_disabled")
        document.addEventListener("keydown", this._handleEscClose.bind(this));
    }
    close(){
        this._popupSelector.classList.add("popup_disabled");
        document.removeEventListener("keydown", this._handleEscClose.bind(this));
    }
    _handleEscClose(evt){
        if (evt.keyCode === 27) {
            const openedPopup = document.querySelector(".popup:not(.popup_disabled)");
            this.close(openedPopup);
          }
    }
    setEventListeners(){
            const popupCloseButton = this._popupSelector.querySelector('.popup__close-button')
            popupCloseButton.addEventListener("click",  () => {
            this.close();
        })
    }
}