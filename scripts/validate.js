const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('pop-up-form__field_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('pop-up-form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('pop-up-form__field_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('pop-up-form__input-error_active');
};

const checkImputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('pop-up-form__button-submit_disabled');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('pop-up-form__button-submit_disabled');
    buttonElement.removeAttribute('disabled');
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.pop-up-form__field'));
  const buttonElement = formElement.querySelector('.pop-up-form__button-submit');
  inputList.forEach((inputElement) => {
    checkImputValidity(formElement, inputElement);
  });
  toggleButtonState(inputList, buttonElement);
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.pop-up-form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('input', function (evt) {
      evt.preventDefault();
      setEventListeners(formElement);
    });
  });
};

enableValidation();
