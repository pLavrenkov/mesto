export class Card {
  constructor(data, cardSelector, handleCardClick, userApi) {
    this._title = data.name;
    this._image = data.link;
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._userApi = userApi;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__photo');
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = `Фотоизображение: ${this._title}`;
    this._userApi.getUserInfo()
        .then(res => {
          if (res._id === this._data.owner._id) {
            this._element.querySelector('.element__bin-button').classList.remove('element__bin-button_display_none');
          }
          this._element.querySelector('.element__likes').textContent = this._data.likes.length;
        })
        .catch(err => {
          console.log(err);
        });
    return this._element;
  }

  _setEventListeners() {
    this._likeElement = this._element.querySelector('.element__like');
    this._likeElement.addEventListener('click', () => {
      this._likeElement.classList.toggle('element__like_active');
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._image);
    });
  }
}

