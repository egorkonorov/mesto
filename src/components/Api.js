export default class Api {
    constructor(options) {
      this._url = options.baseUrl
      this._authorization = options.headers.authorization
      this._contentType = options.headers.contentType
    }

    _getResponseData(res) {
      if (res.ok) {
      return res.json()   
      }
      return Promise.reject(`Ошибка: ${res.status}`); 
    }




    getUserInfo(){
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this._authorization
                 }
        })

        .then(res => {
          return this._getResponseData(res)
    })
    }


    getInitialCards() {
        return fetch(`${this._url}/cards`, {
        method: 'GET',
    headers: {
      authorization: this._authorization
    }
  })
  .then(res => {
    return this._getResponseData(res)
})
    }

    patchUserInfo(inputValues){
      return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: {
            authorization: this._authorization,
            'Content-Type': this._contentType
          },
          body: JSON.stringify({
            name: inputValues.naming,
            about: inputValues.description
          })
        })
        .then(res => {
          return this._getResponseData(res)
    })

    }

    postNewCard(picture, link){
      return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        },
        body: JSON.stringify({
          name: picture,
          link: link
        })
      }) 
      .then(res => {
        return this._getResponseData(res)
  })

    }

    

    deleteCard(cardId){
      return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization
        }
  
      })
      .then(res => {
        return this._getResponseData(res)
      })

    }

     setLikeCard(cardId) {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          authorization: this._authorization
        }
  
      })
      .then(res => {
        return this._getResponseData(res)
  })
     }

     deleteLikeCard(cardId){
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization
        }
  
      })
      .then(res => {
        return this._getResponseData(res)
  })
     }
     patchUserAvatar(inputValues){
      return fetch(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: {
            authorization: this._authorization,
            'Content-Type': this._contentType
          },
          body: JSON.stringify({
            avatar: inputValues.avatar,
          })
        })
        .then(res => {
          return this._getResponseData(res)
    })
    }
    }
  
  
  
  

 