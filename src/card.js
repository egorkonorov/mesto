import {popupPictureImage} from './script.js' 
import {popupPictureName} from './script.js'
import {openPopup} from './script.js'
import {popupPicture} from './script.js'
  //Класс Card
export class Card {
    constructor(cardSelector, name, link) {
      this._cardSelector = cardSelector;
      this._name = name;
      this._picture = link;
    }

    _getTemplate() {
      const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);
      return cardElement
    }
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      this._element.querySelector('.elements__picture').src = this._picture;
      this._element.querySelector('.elements__picture').alt = this._name;
      this._element.querySelector('.elements__name').textContent = this._name;
  
      return this._element;
    }
    _setEventListeners() {
      this._element.querySelector('.elements__like').addEventListener('click', () => {
        this._handleLikeButtonClick()
        });
      this._element.querySelector('.elements__trash').addEventListener('click', () => {
        this._handleTrashButtonClick()
        });
      this._element.querySelector('.elements__picture').addEventListener('click', () => {    
        this._handlePopupPictureClick()
        });
    }
    _handleLikeButtonClick(){
      this._element.querySelector('.elements__like').classList.toggle('elements__like_active');
    }

    _handleTrashButtonClick(){
      const listItem =  this._element.querySelector('.elements__trash').closest('.elements__element')
      listItem.remove()
    }
    
    _handlePopupPictureClick(){
      popupPictureImage.src = this._picture
      popupPictureName.textContent = this._name
      popupPictureImage.alt = this._name
      openPopup(popupPicture) 
    }
    
  }