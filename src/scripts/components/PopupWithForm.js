import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, formSubmit) {
    super(popup);
    this._formSubmit = formSubmit;
    this._buttonSubmit = this._popup.querySelector(popup.submitButton);
    this._form = this._popup.querySelector(popup.form);
    this._inputList = this._form.querySelectorAll(popup.input);
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    console.log(this._formValues);
    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners = (evt) => {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
    });
  }

  renderLoading(text) {
    this._buttonSubmit.textContent = text;
  }
}

export { PopupWithForm };
