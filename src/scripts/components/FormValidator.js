class FormValidation {
  constructor(formSelectors, formElement) {
    //this._formSelector = formSelectors.name;
    //this._formElementSelector = formSelectors.form;
    this._inputElementSelector = formSelectors.input;
    this._errorElementSelector = formSelectors.error;
    this._errorActiveClass = formSelectors.error_active;
    this._inputErrorClass = formSelectors.input_error;
    this._buttonClass = formSelectors.submitButton;
    this._formElement = formElement;
    this._submitButton = formElement.querySelector(this._buttonClass);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputElementSelector));
  };

  // обработчики для input формы
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorActiveClass);
  };

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorActiveClass);
  };

  _checkImputValidity (inputElement) {
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

  _hasEmptyidInput() {
    return this._inputList.some((inputElement) => {
      inputElement.value === '';
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
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkImputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._submitButton);
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
    this._inputList.forEach((inputElement) => {
      if (inputElement.classList.contains(this._inputErrorClass)) {
        this._hideInputError(inputElement);
      }
    });
  }
  // не стал исправлять, поскольку методы очистки у форм разные: в предзаполненной форме userInfo надо убрать ошибки перед открытием popup и копку не требуется не блокировать,
  // а в форме добавления новой карточки надо наоборот при открытии popup сохранять ошибки вместе с введенными значениями и выводить их при новом открытии popup
  // если делать только метод _toggleButton(), то при пустой форме кнопка не блокируется, а если всталять в _toggleButton() учет пустой формы, то это блокирует кнопку попапа с userInfo при открытии с предзаполнненными полями
  // предложенный на ревью вариант организации кода такое различие поведения не учитывает (или я не нашел нужный вариант организации кода)
  disactiveSubmitButton = () => {
    if (!this._hasEmptyidInput()) {
      this._submitButton.setAttribute('disabled', true);
    }
  }
};

export { FormValidation };
