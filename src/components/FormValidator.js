
//Класс FormValidator
export class FormValidator {
  constructor(
    formSelector,
    config
  ) {
    this._formSelector = formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  enableValidation() {
    this._setEventListeners();
  }
  _setEventListeners() {
    const formElement = document.querySelector(this._formSelector);
    this._formElement = formElement;
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._inputList = inputList;
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._buttonElement = buttonElement;
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._inputElement = inputElement;
        this._isValid();
        this.toggleButtonState();
      });
    });
  }
  _isValid() {
    if (!this._inputElement.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  }
  _showInputError() {
    const errorElement = this._formElement.querySelector(
      `#span-${this._inputElement.id}`
    );
    this._inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = this._inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }
  _hideInputError() {
    const errorElement = this._formElement.querySelector(
      `#span-${this._inputElement.id}`
    );
    this._errorElement = errorElement;
    this._inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = "";
  }
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "disabled");
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled", "disabled");
    }
  }
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
}
