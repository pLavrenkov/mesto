export class Card {
  constructor(data, cardSelector, handleCardClick, api, userId) {
    this._title = data.name;
    this._image = data.link;
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._api = api;
    this._cardId = this._data._id;
    this._likesArr = this._data.likes;
    this._userId = userId;
    //console.log(this._cardId);
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
    if (this._userId === this._data.owner._id) {
      this._element.querySelector('.element__bin-button').classList.remove('element__bin-button_display_none');
    }
    this._element.querySelector('.element__likes').textContent = this._data.likes.length;
    if (Array.from(this._likesArr).some(elem => elem._id === this._userId)) {
      this._likeElement.classList.add('element__like_active');
    }
    return this._element;
  }

  _setEventListeners() {
    this._likeElement = this._element.querySelector('.element__like');
    this._likeElement.addEventListener('click', () => {

      this._api.getLike(this._cardId)
        .then(res => {
          //console.log(res);
          const findId = Array.from(res).find(elem => elem._id === this._cardId);
          //console.log(findId);
          if (Array.from(findId.likes).some(elem => elem._id === this._userId)) {
            this._api.deleteLike(this._cardId)
              .then(res => {
                //console.log(res.likes.length);
                //console.log(res);
                this._element.querySelector('.element__likes').textContent = res.likes.length;
              });
          } else {
            this._api.putLike(this._cardId)
              .then(res => {
                //console.log(res.likes.length);
                //console.log(res);
                this._element.querySelector('.element__likes').textContent = res.likes.length;
              });
          }
        })


      /*
            this._api.getUserInfo()
              .then(user => {
                this._api.getLike(this._cardId)
                  .then(res => {
                    //console.log(res);
                    const findId = Array.from(res).find(elem => elem._id === this._cardId);
                    //console.log(findId);
                    if (Array.from(findId.likes).some(elem => elem._id === user._id)) {
                      this._api.deleteLike(this._cardId)
                        .then(res => {
                          //console.log(res.likes.length);
                          //console.log(res);
                          this._element.querySelector('.element__likes').textContent = res.likes.length;
                        });
                    } else {
                      this._api.putLike(this._cardId)
                        .then(res => {
                          //console.log(res.likes.length);
                          //console.log(res);
                          this._element.querySelector('.element__likes').textContent = res.likes.length;
                        });
                    }
                  })
              })*/
      this._likeElement.classList.toggle('element__like_active');
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._image);
    });
  }
}

