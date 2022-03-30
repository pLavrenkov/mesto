// глобальные переменные
export const cardsElementSelector = '.element-list';
export const openProfileButton = document.querySelector('.profile__edit-button');
export const openAvatarEditButton = document.querySelector('.profile__avatar-button');
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

// объекты с данными попапов
export const popupSettings = {
  active: 'pop-up_opened',
  form: '.pop-up-form',
  input: '.pop-up-form__field',
  error: '.pop-up-form__input-error',
  error_active: 'pop-up-form__input-error_active',
  input_error: 'pop-up-form__field_type_error',
  button: '.pop-up-form__button-submit',
  closeButton: '.pop-up__button-close',
  submitButton: '.pop-up-form__button-submit',
  closeButton: '.pop-up__button-close'
};

export const userInfoPopup = {
  id: '#pop-up-profile',
  name: '[name = "profile-form"]',
  inputTitle: '#pop-up-form-profile-title',
  inputAddedInfo: '#pop-up-form-profile-added-info',
  popupElement: document.querySelector('#pop-up-profile'),
  formElement: document.querySelector('[name = "profile-form"]')
};

export const avatarPopup = {
  id: '#pop-up-avatar-edit',
  name: '[name = "avatar-form"]',
  inputAddedInfo: '#pop-up-form-avatar-url',
  popupElement: document.querySelector('#pop-up-avatar-edit'),
  formElement: document.querySelector('[name = "avatar-form"]')
};

export const newCardPopup = {
  id: '#pop-up-add-new-card',
  name: '[name = "newcard-form"]',
  inputTitle: '#pop-up-form-new-card-title',
  inputAddedInfo: '#pop-up-form-new-card-added-info',
  popupElement: document.querySelector('#pop-up-add-new-card'),
  formElement: document.querySelector('[name = "newcard-form"]')
};

export const imagePopup = {
  id: '#pop-up-image-view',
  popupElement: document.querySelector('#pop-up-image-view'),
  image: '.pop-up-picture__photo',
  caption: '.pop-up-picture__caption'
};

export const deletePopup = {
  id: '#pop-up-delete-card',
  name: '[name = "deletecard-form"]',
  popupElement: document.querySelector('#pop-up-delete-card'),
  formElement: document.querySelector('[name = "deletecard-form"]')
}
