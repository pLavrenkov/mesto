//const formElement = document.querySelector('[name="profile-form"]');
//const inputElement = document.querySelector('#pop-up-form-profile-title');

//const errorMessage = inputElement.validationMessage;

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

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.pop-up-form__field'));
  inputList.forEach((inputElement) => {
    checkImputValidity(formElement, inputElement);
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.pop-up-form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('input', function(evt) {
      evt.preventDefault();
      setEventListeners(formElement);
    });
  });
};

enableValidation();
