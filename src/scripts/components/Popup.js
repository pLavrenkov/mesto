class Popup {
  constructor(popup) {
    this._popup = document.querySelector(popup.id);
    this._popupId = popup.id;
    this._popupOpenedSelector = popup.active;
    this._buttonClose = this._popup.querySelector(popup.closeButton);
  }

  open() {
    this._popup.classList.add(this._popupOpenedSelector);
  }

  close = () => {
    this._popup.classList.remove(this._popupOpenedSelector);
  }

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close();
      event.stopPropagation();
    }
  };

  setEventListeners() {
    this._buttonClose.addEventListener('click', () => {
      this.close();
    });
    this._popup.addEventListener('click', (event) => {
      if (event.target === this._popup) {
        this.close();
      }
    });
    document.addEventListener('keydown', this._handleEscClose);
  }
}

export { Popup };
