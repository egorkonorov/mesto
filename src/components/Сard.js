
//Класс Card
export default class Card {
  constructor(cardSelector, name, link, likes, owner, {handleCardClick}, {openPopupDelete}) {
    this._cardSelector = cardSelector;
    this._name = name;
    this._picture = link;
    this._handleCardClick = handleCardClick
    this._likes = likes
    this._openPopupDelete = openPopupDelete
    this._owner = owner
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);
    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".elements__picture").src = this._picture;
    this._element.querySelector(".elements__picture").alt = this._name;
    this._element.querySelector(".elements__name").textContent = this._name;
    this._element.querySelector(".elements__likes-counter").textContent = this._likes;
    //Отключение кнопки удаления у чужих карточек"
    const profileName = document.querySelector('.profile__name').textContent;
    if (!(this._owner === profileName)){
      const trash = this._element.querySelector(".elements__trash")
      trash.classList.add('elements__trash_disabled')
    }
    return this._element;
  }
  _setEventListeners() {
    this._element
      .querySelector(".elements__like")
      .addEventListener("click", () => {
        this._handleLikeButtonClick();
      });
    this._element
      .querySelector(".elements__trash") 
      .addEventListener("click", () => {
        this._handleTrashButtonClick();
      });
    this._element
      .querySelector(".elements__picture")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._picture);
      });
  }
  _handleLikeButtonClick() {
    this._element
      .querySelector(".elements__like")
      .classList.toggle("elements__like_active");
      // const likeStatus = false;
      // const likeIsActive = !likeStatus
      // if (likeIsActive){

      // }

  }

  _handleTrashButtonClick() {
    const listItem = this._element 
      .querySelector(".elements__trash") 
      .closest(".elements__element");
    this._openPopupDelete(listItem)
  }
}
