
export default class UserInfo{
    constructor(userNameSelector, userInformationSelector, userAvatarSelector){
        this._userName = document.querySelector(userNameSelector);
        this._userInformation = document.querySelector(userInformationSelector);
        this._userAvatar = document.querySelector(userAvatarSelector);
    }
    getUserInfo(){
        this._userInfo = 
            { name: this._userName.textContent,
              information: this._userInformation.textContent
            };
        return this._userInfo;
    }
    setUserInfo(newUserName, newUserInformation){
        this._userName.textContent = `${newUserName}`;
        this._userInformation.textContent = `${newUserInformation}`;
    }
    setUserAvatar(newUserAvatar){
        this._userAvatar.src = `${newUserAvatar}`    
    }
    setUserInfoAll(newUserName, newUserInformation, newUserAvatar){
        this._userName.textContent = `${newUserName}`;
        this._userInformation.textContent = `${newUserInformation}`;
        this._userAvatar.src = `${newUserAvatar}`
    }
}