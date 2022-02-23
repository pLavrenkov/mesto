class FormValidation {
  constructor(formSelectors, formElement) {
    this._formSelector = formSelectors.name;
    this._formElementSelector = formSelectors.form;
    this._inputElementSelector = formSelectors.input;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('pop-up-form__field_type_error');
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add('pop-up-form__input-error_active');
  }

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('pop-up-form__field_type_error');
    errorElement.textContent = '';
    errorElement.classList.remove('pop-up-form__input-error_active');
  };

  _checkImputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.removeAttribute('disabled');
    }
  };

  _setEventListeners () {
    this._inputList = Array.from(this._formElement.querySelectorAll('.pop-up-form__field'));
    this._buttonElement = this._formElement.querySelector('.pop-up-form__button-submit');
    this._inputList.forEach((inputElement) => {
      this._checkImputValidity(inputElement);
    });
    this._toggleButtonState(this._inputList, this._buttonElement);
  };

  enableValidation () {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      formElement.addEventListener('input', function (evt) {
        evt.preventDefault();
        this._setEventListeners();
      });
    });
  };
}

export { FormValidation };

/*
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.removeAttribute('disabled');
  }
};

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
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    formElement.addEventListener('input', function (evt) {
      evt.preventDefault();
      setEventListeners(formElement);
    });
  });
};

enableValidation()*/
