import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, formSubmit) {
    super(popup);
    this._formSubmit = formSubmit;
    this._buttonSubmit = this._popup.querySelector(popup.submitButton);
    this._form = this._popup.querySelector(popup.form);
    this._inputList = this._form.querySelectorAll(popup.input);
    this._inputTitle = this._popup.querySelector(popup.inputTitle);
    this._inputAddedInfo = this._popup.querySelector(popup.inputAddedInfo);
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      console.log(input.value);
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }


  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners = (evt) => {
    super.setEventListeners();
    console.log(this._getInputValues());
    const data = this._getInputValues();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log(data);
      this._formSubmit(this._getInputValues());
    });
  }
}

export { PopupWithForm };
