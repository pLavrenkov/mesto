import {handleCardClick} from './index.js';

class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this._title;
    this._element.querySelector('.element__photo').src = this._image;
    this._element.querySelector('.element__photo').alt = `Фотоизображение: ${this._title}`;
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._element.querySelector('.element__like').classList.toggle('element__like_active');
    });

    this._element.querySelector('.element__bin-button').addEventListener('click', function (event) {
      const item = event.target;
      item.closest('.element').remove();
    });

    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this._handleCardClick(this._title, this._image);
    });
  }
}

export { Card }

