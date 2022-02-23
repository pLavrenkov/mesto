class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
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
      document.querySelector('.pop-up-picture__photo').src = this._image;
      document.querySelector('.pop-up-picture__caption').textContent = this._title;
      document.querySelector('.pop-up-picture__photo').alt = `Фотоизображение: ${this._title}`;
      document.querySelector('#pop-up-image-view').classList.add('pop-up_opened');
    });
  }
}

export { Card }
