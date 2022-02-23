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
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputElementSelector));
    const buttonElement = this._formElement.querySelector(this._buttonClass);
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkImputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
};

export { FormValidation };
