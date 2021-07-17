export default class Api {
    constructor(options) {
      this._url = options.baseUrl
      this._headers = options.headers.authorization
    }

    getUserInfo(){
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this._headers
                     }
        })

        .then(res => {
            if (res.ok) {
              return res.json()
            }
      
            return Promise.reject(`Ошибка: ${res.status}`);
          })
      
    }
  
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
        method: 'GET',
    headers: {
      authorization: this._headers
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
    }

    patchUserInfo(inputValues){
      return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: {
            authorization: 'a9c109c0-41f8-4711-973c-118851a874e2',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: inputValues.naming,
            about: inputValues.description
          })
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })

    }

    postNewCard(picture, link){
      return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: {
          authorization: 'a9c109c0-41f8-4711-973c-118851a874e2',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: picture,
          link: link
        })
      }) 
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })

    }

    

    deleteCard(cardId){
      return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._headers
        }
  
      })


    }

     setLikeCard(cardId) {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          authorization: this._headers
        }
  
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      }); 
     }

     deleteLikeCard(cardId){
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._headers
        }
  
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      });  
     }
     patchUserAvatar(inputValues){
      return fetch(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: {
            authorization: 'a9c109c0-41f8-4711-973c-118851a874e2',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            avatar: inputValues.avatar,
          })
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
    
          return Promise.reject(`Ошибка: ${res.status}`);
        });  
    }
    }
  
  
  
  

 