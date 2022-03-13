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

  _getInputValues() {
    const formInfo = {
      title: this._inputTitle.value,
      addedInfo: this._inputAddedInfo.value
    }
    return formInfo;
  }

  open() {
    super.open();
  }

  setEventListeners() {
    console.log(this._buttonClose);
    this._buttonClose.addEventListener('click', this.close);
    this._popup.addEventListener('click', this.close);
    document.addEventListener('keydown', this._handleEscClose);
    this._buttonSubmit.addEventListener('click', this._formSubmit);
  }

  close() {
    console.log(this._popup);
    super.close();
    this._popup.classList.remove(this._popupOpenedSelector);
    this.removeEventListeners();
    this._form.reset();
  }
}

export { PopupWithForm };
