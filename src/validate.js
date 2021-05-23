// Функция, которая добавляет класс с ошибкой и span строку ошибки

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`#span-${inputElement.id}`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  };
  
  // Функция, которая удаляет класс с ошибкой и span строку ошибки
  const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`#span-${inputElement.id}`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
  };
  
  // Функция проверки валидности поля
  const isValid = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  };
  // Функция добавления обработчиков всем полям формы
  function setEventListeners (formElement, config){
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);
    inputList.forEach(function(inputElement){
      inputElement.addEventListener('input', function(){
        isValid(formElement, inputElement, config)
        toggleButtonState(inputList, buttonElement, config) ;
      })
    })
  }
  // Функция перебора всех форм и добавления их полям ввода обработчиков
  function enableValidation(config){
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach(function(formElement){
      setEventListeners(formElement, config)
    })
  }
  
  enableValidation(config); 
  
  
  //Функция поиска невалидных строк ввода
  function hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 
  
  function toggleButtonState (inputList, buttonElement, config){
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled')
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.removeAttribute('disabled', 'disabled')
    }
  }; 