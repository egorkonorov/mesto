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
      fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: {
            authorization: this._headers
          },
          body: JSON.stringify({
            name: inputValues.naming,
            about: inputValues.description
          })
        }); 
    }

    postNewCard(picture, link){
      fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: {
          authorization: 'a9c109c0-41f8-4711-973c-118851a874e2',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: picture,
          link: link
        })
      }); 
    }

    deleteCard(cardId){
      fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._headers
        }
  
      }); 

    }
    }
  
  
  
  

 