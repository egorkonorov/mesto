// Функция, которая добавляет класс с ошибкой и span строку ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.popup__${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`popup__${inputElement.id}-error_active`);
  };
  
  // Функция, которая удаляет класс с ошибкой и span строку ошибки
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.popup__${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove(`popup__${inputElement.id}-error_active`);
    errorElement.textContent = "";
  };
  
  // Функция проверки валидности поля
  const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement,);
    }
  };
  // Функция добавления обработчиков всем полям формы
  function setEventListeners (formElement){
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__submit-button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach(function(inputElement){
      inputElement.addEventListener('input', function(){
        isValid(formElement, inputElement)
        toggleButtonState(inputList, buttonElement);
      })
    })
  }
  // Функция перебора всех форм и добавления их полям ввода обработчиков
  function enableValidation(){
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach(function(formElement){
      setEventListeners(formElement)
    })
  }
  
  enableValidation()
  
  
  //Функция поиска невалидных строк ввода
  function hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 
  
  function toggleButtonState (inputList, buttonElement){
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__submit-button_inactive');
      buttonElement.setAttribute('disabled', 'disabled')
    } else {
      buttonElement.classList.remove('popup__submit-button_inactive');
      buttonElement.removeAttribute('disabled', 'disabled')
    }
  }; 