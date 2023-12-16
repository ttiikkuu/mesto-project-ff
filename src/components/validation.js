const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
  
      return !inputElement.validity.valid;
    })
  }; 

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
          buttonElement.disabled = true;
      buttonElement.classList.add('form__submit_inactive');
    } else {
          buttonElement.disabled = false;
      buttonElement.classList.remove('form__submit_inactive');
    }
  }; 





  
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
    inputElement.classList.add('popup__input_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}_error`);

    inputElement.classList.remove('popup__input_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
  }; 

const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {

  inputElement.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");
} else {

  inputElement.setCustomValidity("");
}

if (!inputElement.validity.valid) {

  showInputError(formElement, inputElement, inputElement.validationMessage);
} else {
  hideInputError(formElement, inputElement);
}
}; 
  
  const setEventListeners = (formElement) => {

  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

  const buttonElement = formElement.querySelector('.popup__button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);


      toggleButtonState(inputList, buttonElement);
    });
  });
}; 


  export const enableValidation = () => {

    const formList = Array.from(document.querySelectorAll('.popup__form'));
  

    formList.forEach((formElement) => {
 
      setEventListeners(formElement);
    });
  };