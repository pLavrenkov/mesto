import { Popup } from "./Popup.js";

export class PopupDeleteCard extends Popup {
  constructor(popup, formSubmit, cardId) {
    super(popup);
    this._formSubmit = formSubmit;
    this._buttonSubmit = this._popup.querySelector(popup.submitButton);
    this._form = this._popup.querySelector(popup.form);
    this._inputList = this._form.querySelectorAll(popup.input);
    this._cardId = cardId;
  }

  setEventListeners = (evt) => {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._cardId);
    });
  }
}

