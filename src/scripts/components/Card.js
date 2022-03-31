export class Card {
  constructor(data, cardSelector, handleCardClick, api, userId, binSelector, popupDeleteCard) {
    this._title = data.name;
    this._image = data.link;
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._api = api;
    this._cardId = this._data._id;
    this._likesArr = this._data.likes;
    this._userId = userId;
    this._binSelector = binSelector;
    this._popupDeleteCard = popupDeleteCard;
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
    // отображение корзины на карточке
    if (this._userId === this._data.owner._id) {
      this._element.querySelector('.element__bin-button').classList.remove('element__bin-button_display_none');
    }
    // установка начального количества лайков
    this._element.querySelector('.element__likes').textContent = this._data.likes.length;
    // загрузка лайков пользователя
    if (Array.from(this._likesArr).some(elem => elem._id === this._userId)) {
      this._likeElement.classList.add('element__like_active');
    }
    return this._element;
  }

  _setEventListeners() {
    this._likeElement = this._element.querySelector('.element__like');
    this._likeElement.addEventListener('click', () => {
      // обработка лайков
      this._api.getLike(this._cardId)
        .then(res => {
          const findId = Array.from(res).find(elem => elem._id === this._cardId);
          if (Array.from(findId.likes).some(elem => elem._id === this._userId)) {
            this._api.deleteLike(this._cardId)
              .then(res => {
                this._element.querySelector('.element__likes').textContent = res.likes.length;
                this._likeElement.classList.toggle('element__like_active');
              })
              .catch(err => {
                alert(`При удалении лайка возникла ошибка ${err}`);
              });
          } else {
            this._api.putLike(this._cardId)
              .then(res => {
                this._element.querySelector('.element__likes').textContent = res.likes.length;
                this._likeElement.classList.toggle('element__like_active');
              })
              .catch(err => {
                alert(`При установке лайка возникла ошибка ${err}`);
              });
          }
        })
        .catch(err => {
          alert(`При получении данных о лайках возникла ошибка ${err}`);
        })
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._image);
    });
    this._binElement = this._element.querySelector(this._binSelector);
    this._binElement.addEventListener('click', (evt) => {
      const cardElement = evt.target.closest('.element');
      this._popupDeleteCard.open(this._data, cardElement);
    })
  }
}

