const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
  
      return !inputElement.validity.valid;
    })
  }; 



  const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };
  
  const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}_error`);

    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  }; 

const isValid = (formElement, inputElement, { inputErrorClass, errorClass }) => {
  if (inputElement.validity.patternMismatch) {

    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
} else {

  inputElement.setCustomValidity("");
}

if (!inputElement.validity.valid) {

  showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
} else {
  hideInputError(formElement, inputElement, inputErrorClass, errorClass);
}
}; 




const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}; 



  
  const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  const buttonElement = formElement.querySelector(submitButtonSelector);

  formElement.addEventListener('reset', () => {
    setTimeout(() => {
        disableButton(buttonElement, inactiveButtonClass);
    }, 0);
  })

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, rest);


      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
}; 


  export const enableValidation = ({ formSelector, ...rest }) => {

    const formList = Array.from(document.querySelectorAll(formSelector));
  

    formList.forEach((formElement) => {
 
      setEventListeners(formElement, rest);
    });
  };


  const disableButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass)
    buttonElement.disabled = true
}



export const clearValidation = (form, validationConfig) => {
  const inputElement = form.querySelectorAll(validationConfig.inputSelector);
  inputElement.forEach((inputElement) => {
    inputElement.classList.remove(validationConfig.inputErrorClass);
    const errorElement = form.querySelectorAll(`.${inputElement.id}_error`);
    errorElement.forEach((errorElement) => {
      errorElement.classList.remove(validationConfig.errorClass);
      errorElement.textContent = '';
    });
  });
  form.reset();
}