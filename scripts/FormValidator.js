class FormValidation {
  constructor(formSelectors, formElement) {
    this._formSelector = formSelectors.name;
    this._formElementSelector = formSelectors.form;
    this._inputElementSelector = formSelectors.input;
    this._errorElementSelector = formSelectors.error;
    this._errorActiveClass = formSelectors.error_active;
    this._inputErrorClass = formSelectors.input_error;
    this._buttonClass = formSelectors.button;
    this._formElement = formElement;
    this._submitButton = formElement.querySelector(this._buttonClass);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputElementSelector));
    this._errorElemntList = Array.from(this._formElement.querySelectorAll(this._errorElementSelector));
  };

  // обработчики для input формы
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorActiveClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorActiveClass);
  };

  _checkImputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // обработчики для кнопки формы
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.removeAttribute('disabled');
    }
  };

  // установщик событий для input-полей и кнопки
  _setEventListeners() {
    const buttonElement = this._formElement.querySelector(this._buttonClass);
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkImputValidity(inputElement);
        this._toggleButtonState(this._inputList, buttonElement);
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  // сброс валидации для очистки PopUp
  resetValidation() {
    this._inputList.forEach((formElement) => {
      if (formElement.classList.contains(this._inputErrorClass)) {
        formElement.classList.remove(this._inputErrorClass);
      }
    });
    this._errorElemntList.forEach((elementError) => {
      if (elementError.classList.contains(this._errorActiveClass)) {
        elementError.classList.remove(this._errorActiveClass);
      }
    });
  }

  disactiveSubmitButton() {
    this._submitButton.setAttribute('disabled', true);
  }
};

export { FormValidation };
