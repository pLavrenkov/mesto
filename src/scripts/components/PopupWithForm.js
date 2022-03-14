import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, formSubmit) {
    super(popup);
    this._formSubmit = formSubmit;
    this._buttonSubmit = this._popup.querySelector(popup.submitButton);
    this._form = this._popup.querySelector(popup.form);
    this._inputTitle = this._popup.querySelector(popup.inputTitle);
    this._inputAddedInfo = this._popup.querySelector(popup.inputAddedInfo);
  }

  _getInputValues = () => {
    const formInfo = {
      title: this._inputTitle.value,
      addedInfo: this._inputAddedInfo.value
    }
    return formInfo;
  }

  open() {
    super.open();
  }

  close() {
    super.close();
    this._getInputValues();
    this._form.reset();
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._buttonSubmit.addEventListener('click', this._formSubmit);
  }
}

export { PopupWithForm };
