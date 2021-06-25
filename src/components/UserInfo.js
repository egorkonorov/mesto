
export default class UserInfo{
    constructor(userNameSelector, userInformationSelector){
        this._userName = document.querySelector(userNameSelector);
        this._userInformation = document.querySelector(userInformationSelector);
    }
    getUserInfo(){
        this._userInfo = 
            { name: this._userName.textContent,
              information: this._userInformation.textContent
            };
        return this._userInfo;
    }
    setUserInfo(newUserName, newUserInformation){
        console.log(this._userName)
        this._userName.textContent = `${newUserName}`;
        this._userInformation.textContent = `${newUserInformation}`;
    }

}