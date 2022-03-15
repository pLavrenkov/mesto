// глобальные переменные
export const cardsElementSelector = '.element-list';
export const openProfileButton = document.querySelector('.profile__edit-button');
export const openNewCardButton = document.querySelector('.profile__add-button');
export const nameSelector = '.profile__title';
export const jobSelector = '.profile__subtitle';
export const popUpProfile = document.querySelector('#pop-up-profile');
export const nameInput = popUpProfile.querySelector('#pop-up-form-profile-title');
export const jobInput = popUpProfile.querySelector('#pop-up-form-profile-added-info');
export const popUpNewCard = document.querySelector('#pop-up-add-new-card');
export const titleInput = popUpNewCard.querySelector('#pop-up-form-new-card-title');
export const imageInput = popUpNewCard.querySelector('#pop-up-form-new-card-added-info');
export const formNewCard = popUpNewCard.querySelector('.pop-up-form');
export const cardSelector = '#card-element';

export const popupSettings = {
  active: 'pop-up_opened',
  form: '.pop-up-form',
  input: '.pop-up-form__field',
  error: '.pop-up-form__input-error',
  error_active: '.pop-up-form__input-error_active',
  input_error: '.pop-up-form__field_type_error',
  button: '.pop-up-form__button-submit',
  closeButton: '.pop-up__button-close',
  button: '.pop-up-form__button-submit',
  closeButton: '.pop-up__button-close',
};


// объекты popup и form
export const profileForm = {
  name: '[name =" profile-form"]',
  active: 'pop-up_opened',
  form: '.pop-up-form',
  input: '.pop-up-form__field',
  inputTitle: '#pop-up-form-profile-title',
  inputAddedInfo: '#pop-up-form-profile-added-info',
  error: '.pop-up-form__input-error',
  error_active: 'pop-up-form__input-error_active',
  input_error: 'pop-up-form__field_type_error',
  button: '.pop-up-form__button-submit',
  closeButton: '.pop-up__button-close',
  selector: document.querySelector('[name = "profile-form"]')
};

export const newCardForm = {
  name: '[name = "newcard-form"]',
  active: 'pop-up_opened',
  form: '.pop-up-form',
  input: '.pop-up-form__field',
  inputTitle: '#pop-up-form-new-card-title',
  inputAddedInfo: '#pop-up-form-new-card-added-info',
  error: '.pop-up-form__input-error',
  error_active: 'pop-up-form__input-error_active',
  input_error: 'pop-up-form__field_type_error',
  button: '.pop-up-form__button-submit',
  closeButton: '.pop-up__button-close',
  selector: document.querySelector('[name = "newcard-form"]')
};

export const userInfoPopup = {
  id: '#pop-up-profile',
  form: '.pop-up-form',
  active: 'pop-up_opened',
  inputTitle: '#pop-up-form-profile-title',
  inputAddedInfo: '#pop-up-form-profile-added-info',
  closeButton: '.pop-up__button-close',
  submitButton: '.pop-up-form__button-submit',
  selector: document.querySelector('#pop-up-profile')
};

export const newCardPopup = {
  id: '#pop-up-add-new-card',
  form: '.pop-up-form',
  active: 'pop-up_opened',
  inputTitle: '#pop-up-form-new-card-title',
  inputAddedInfo: '#pop-up-form-new-card-added-info',
  closeButton: '.pop-up__button-close',
  submitButton: '.pop-up-form__button-submit',
  selector: document.querySelector('#pop-up-add-new-card')
};

export const imagePopup = {
  id: '#pop-up-image-view',
  active: 'pop-up_opened',
  closeButton: '.pop-up__button-close',
  submitButton: '.pop-up-form__button-submit',
  selector: document.querySelector('#pop-up-image-view'),
  image: '.pop-up-picture__photo',
  caption: '.pop-up-picture__caption'
};
