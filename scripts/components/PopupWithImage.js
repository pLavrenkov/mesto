import { Popup } from './Popup.js'

class PopupWithImage extends Popup {
  constructor({ name, link }, popup) {
    super(popup);
    this._caption = this._popup.querySelector(popup.caption);
    this._photo = this._popup.querySelector(popup.image);
    this._link = link;
    this._caption = name;
    this._alt = `Фотоизображение: ${name}`;
  }

  open = () => {
    this._photo.scr = this._link;
    this._photo.alt = this._alt;
    this._caption.textContent = this._caption;
    this._popup.classList.add(this._popupOpenedSelector);
    this.setEventListeners();
  }
}

export { PopupWithImage };
/*
function handleCardClick(name, link) {
  popUpPicturePhoto.src = link;
  popUpPictureCaption.textContent = name;
  popUpPicturePhoto.alt = `Фотоизображение: ${name}`;
  openPopUp(popUpPicture);
}

const popUpPictureCaption = document.querySelector('.pop-up-picture__caption');
const popUpPicturePhoto = document.querySelector('.pop-up-picture__photo');
*/
