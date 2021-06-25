export default class Popup{
    constructor(popupSelector){
        this._popupElement = document.querySelector(popupSelector)
        this._handleEscClose = this._handleEscClose.bind(this)
        this._handleOverlayClose = this._handleOverlayClose.bind(this)
    }
    open(){
        this._popupElement.classList.remove("popup_disabled")
        document.addEventListener("keydown", this._handleEscClose);
        this._popupElement.addEventListener('click',this._handleOverlayClose)
    }
    close(){
        this._popupElement.classList.add("popup_disabled");
        document.removeEventListener("keydown", this._handleEscClose);
    }
    _handleEscClose(evt){
        if (evt.keyCode === 27) {
            const openedPopup = document.querySelector(".popup:not(.popup_disabled)");
            this.close(openedPopup);
          }
    }
    _handleOverlayClose(evt){
        if (evt.target === evt.currentTarget) {
          this.close()
        }
    }
    setEventListeners(){
            const popupCloseButton = this._popupElement.querySelector('.popup__close-button')
            popupCloseButton.addEventListener("click",  () => {
            this.close();
        })
    }
}