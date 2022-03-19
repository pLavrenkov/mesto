import { Popup } from './Popup.js'

class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._caption = this._popup.querySelector(popup.caption);
    this._photo = this._popup.querySelector(popup.image);
  }

  open({ name, link }) {
    this._photo.src = link;
    this._photo.alt = `Фотоизображение: ${name}`;
    this._caption.textContent = name;
    super.open();
  }
}

export { PopupWithImage };

