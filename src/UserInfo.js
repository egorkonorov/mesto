
export default class UserInfo{
    constructor(userNameSelector, userInformationSelector){
        this._userName = document.querySelector(userNameSelector);
        this._userInformation = document.querySelector(userInformationSelector);
    }
    getUserInfo(){
        const userInfo = [
            { name: this._userName.value,
              information: this._userInformation.value
            }
        ];
        return userInfo;
    }
    setUserInfo(newUserName, newUserInformation){
        console.log(this._userName)
        this._userName.textContent = `${newUserName}`;
        this._userInformation.textContent = `${newUserInformation}`;
    }

}