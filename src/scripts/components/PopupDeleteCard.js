import { Popup } from "./Popup.js";

export class PopupDeleteCard extends Popup {
  constructor(popup, formSubmit) {
    super(popup);
    this._formSubmit = formSubmit;
    this._buttonSubmit = this._popup.querySelector(popup.submitButton);
    this._form = this._popup.querySelector(popup.form);
    this._inputList = this._form.querySelectorAll(popup.input);
    this._cardObj = {};
  }

  open(cardData, cardElement) {
    super.open();
    this._cardObj.cardData = cardData;
    this._cardObj.cardElement = cardElement;
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._cardObj.cardData, this._cardObj.cardElement);
    });
  }
}

