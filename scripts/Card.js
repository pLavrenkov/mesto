export class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector('#card-element').content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this._title;
    this._element.querySelector('.element__photo').src = this._image;
    this._element.querySelector('.element__photo').alt = `Фотоизображение: ${title}`;
    return this._element;
  }

  _setEventListeners() {
    cardElement.querySelector('.element__like').addEventListener('click', this._handleBinButton);

    cardElement.querySelector('.element__bin-button').addEventListener('click', function (event) {
      const item = event.target;
      item.closest('.element').remove();
    });

    cardElement.querySelector('.element__photo').addEventListener('click', function () {
      imagePopUpPhoto.src = this._image;
      imagePopUpCaption.textContent = this._title;
      imagePopUpPhoto.alt = `Фотоизображение: ${imagePopUpCaption.textContent}`;
      openPopUp(popUpPicture);
    });
  }

  _handleLikeButton() {
    cardElement.querySelector('.element__like').classList.toggle('element__like_active');
  }

}

