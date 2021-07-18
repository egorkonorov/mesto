
//Класс Card
export default class Card {
  constructor(cardSelector, name, link, likesLength, ownerId, userId, cardId, likes, {handleCardClick}, {openPopupDelete}, {setLikeCard}, {deleteLikeCard}) {
    this._cardSelector = cardSelector;
    this._name = name;
    this._picture = link;
    this._handleCardClick = handleCardClick
    this._likesLength = likesLength
    this._openPopupDelete = openPopupDelete
    this._owner = ownerId
    this._user = userId
    this._cardId = cardId
    this._setLikeCard = setLikeCard
    this._deleteLikeCard = deleteLikeCard
    this._likes = likes
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
    this._element.querySelector(".elements__likes-counter").textContent = this._likesLength;
    //Отключение кнопки удаления у чужих карточек"
    if (!(this._user === this._owner)){
      const trash = this._element.querySelector(".elements__trash")
      trash.classList.add('elements__trash_disabled')
    }
    if(this._isLiked()){
      this._element.querySelector(".elements__like").classList.add('elements__like_active')
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
    if(this._element.querySelector(".elements__like").classList.contains('elements__like_active')){
      this._deleteLikeCard(this._cardId)
    }
    else{
      this._setLikeCard(this._cardId)
    }
  }

  _handleTrashButtonClick() {
    const listItem = this._element 
      .querySelector(".elements__trash") 
      .closest(".elements__element");
    this._openPopupDelete(listItem, this._cardId)
  }

  _isLiked(){
      const likesList = []
      this._likes.forEach(element => {
      likesList.push(element._id)
  })
  if (likesList.includes(this._user)){
    return true
  }
  else {
    return false
       }
}
setLikeCard(length){
  const likesCounter = this._element.querySelector(".elements__likes-counter")
  const likeButton = this._element.querySelector(".elements__like")
  likeButton.classList.toggle("elements__like_active")    
  likesCounter.textContent = length
}
}
