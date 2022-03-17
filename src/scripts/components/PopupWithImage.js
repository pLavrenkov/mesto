import { Popup } from './Popup.js'

class PopupWithImage extends Popup {
  constructor({ name, link }, popup) {
    super(popup);
    this._caption = this._popup.querySelector(popup.caption);
    this._photo = this._popup.querySelector(popup.image);
    this._imageSelector = popup.image;
    this._captionSelector = popup.caption;
    this._link = link;
    this._caption = name;
    this._alt = `Фотоизображение: ${name}`;
  }

  open() {
    this._popup.querySelector(this._imageSelector).src = this._link;
    this._popup.querySelector(this._imageSelector).alt = this._alt;
    this._popup.querySelector(this._captionSelector).textContent = this._caption;
    super.open();
  }
}

export { PopupWithImage };

