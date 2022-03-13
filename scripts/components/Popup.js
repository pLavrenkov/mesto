class Popup {
  constructor(popup) {
    this._popup = document.querySelector(popup.id);
    this._popupId = popup.id;
    this._popupOpenedSelector = popup.active;
    this._buttonClose = this._popup.querySelector(popup.closeButton);
  }

  setEventListeners() {
    this._buttonClose.addEventListener('click', this.close);
    this._popup.addEventListener('click', this.close);
    document.addEventListener('keydown', this._handleEscClose);
  }

  removeEventListeners() {
    this._buttonClose.removeEventListener('click', this.close);
    this._popup.removeEventListener('click', this.close);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  open() {
    console.log(this._popupId);
    this._popup.classList.add(this._popupOpenedSelector);
    this.setEventListeners();
  }

  close() {
    console.log(this._popupId);
    this._popup.classList.remove(this._popupOpenedSelector);
    this.removeEventListeners();
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
      event.stopPropagation();
    }
  };
}

export { Popup };
/*
function openPopUp(popUp) {
  popUp.classList.add('pop-up_opened');
  popUp.addEventListener('click', handleClosePopUpByLayout);
  document.addEventListener('keydown', handleClosePopUpByEsc);
};

function closePopUp(popUp) {
  popUp.classList.remove('pop-up_opened');
  popUp.removeEventListener('click', handleClosePopUpByLayout);
  document.removeEventListener('keydown', handleClosePopUpByEsc);
};

const handleClosePopUpByEsc = (event) => {
  //const popUp = document.querySelector('.pop-up_opened');
  if (event.key === 'Escape') {
    const popUp = document.querySelector('.pop-up_opened');
    closePopUp(popUp);
    event.stopPropagation();
  }
};

const handleClosePopUpByLayout = (event) => {
  const popUp = document.querySelector('.pop-up_opened');
  if (event.target === popUp) {
    closePopUp(event.target);
  }
};



*/
