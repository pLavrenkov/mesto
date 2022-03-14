//импорт css под webpack
import '../pages/index.css';

// глобальные переменные
const cardsElementSelector = '.element-list';
const openProfileButton = document.querySelector('.profile__edit-button');
const openNewCardButton = document.querySelector('.profile__add-button');
const nameSelector = '.profile__title';
const jobSelector = '.profile__subtitle';
const popUpProfile = document.querySelector('#pop-up-profile');
const nameInput = popUpProfile.querySelector('#pop-up-form-profile-title');
const jobInput = popUpProfile.querySelector('#pop-up-form-profile-added-info');
const popUpNewCard = document.querySelector('#pop-up-add-new-card');
const titleInput = popUpNewCard.querySelector('#pop-up-form-new-card-title');
const imageInput = popUpNewCard.querySelector('#pop-up-form-new-card-added-info');
const formNewCard = popUpNewCard.querySelector('.pop-up-form');
const cardSelector = '#card-element';

// объекты popup и form
const profileForm = {
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

const newCardForm = {
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

const userInfoPopup = {
  id: '#pop-up-profile',
  form: '.pop-up-form',
  active: 'pop-up_opened',
  inputTitle: '#pop-up-form-profile-title',
  inputAddedInfo: '#pop-up-form-profile-added-info',
  closeButton: '.pop-up__button-close',
  submitButton: '.pop-up-form__button-submit',
  selector: document.querySelector('#pop-up-profile')
};

const newCardPopup = {
  id: '#pop-up-add-new-card',
  form: '.pop-up-form',
  active: 'pop-up_opened',
  inputTitle: '#pop-up-form-new-card-title',
  inputAddedInfo: '#pop-up-form-new-card-added-info',
  closeButton: '.pop-up__button-close',
  submitButton: '.pop-up-form__button-submit',
  selector: document.querySelector('#pop-up-add-new-card')
};

const imagePopup = {
  id: '#pop-up-image-view',
  active: 'pop-up_opened',
  closeButton: '.pop-up__button-close',
  submitButton: '.pop-up-form__button-submit',
  selector: document.querySelector('#pop-up-image-view'),
  image: '.pop-up-picture__photo',
  caption: '.pop-up-picture__caption'
};

// импорты модулей
import { Card } from './Card.js';
import { FormValidation } from './FormValidator.js';
import { Section } from './components/Section.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';
import { initialCards } from './cards.js';

// формирование валицации
const profileValidation = new FormValidation(profileForm, profileForm.selector);
profileValidation.enableValidation();

const newCardValidation = new FormValidation(newCardForm, popUpNewCard);
newCardValidation.enableValidation();

//обработка popup с user info
const popupUserInfo = new PopupWithForm(userInfoPopup, function () {
  const makeUserInfo = new UserInfo(nameSelector, jobSelector);
  makeUserInfo.setUserInfo(nameInput.value, jobInput.value);
  popupUserInfo.close();
});

openProfileButton.addEventListener('click', function () {
  popupUserInfo.open();
  const makeUserInfo = new UserInfo(nameSelector, jobSelector);
  const userInfo = makeUserInfo.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.job;
  popupUserInfo.setEventListeners();
});

function handleCardClick(name, link) {
  const data = {
    name: name,
    link: link
  }
  const pictureView = new PopupWithImage(data, imagePopup);
  pictureView.open();
  pictureView.setEventListeners();
  document.querySelector(imagePopup.image).addEventListener('click', function () {
    pictureView.close();
  });
}

//формирование карточек
const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem, cardSelector);
    const cardElement = card.generateCard();
    cardsList.setItem(cardElement);
  },
},
  cardsElementSelector
);

cardsList.createItems();

//popup для новых карточек
const popupAddCard = new PopupWithForm(newCardPopup, function () {
  handleSubmitNewCardForm();
  popupAddCard.close();
});

openNewCardButton.addEventListener('click', function () {
  popupAddCard.open();
  newCardValidation.disactiveSubmitButton();
  popupAddCard.setEventListeners();
})

function handleSubmitNewCardForm() {
  const data = {
    name: titleInput.value,
    link: imageInput.value
  };
  console.log(data);
  const addNewCard = new Section({
    items: [data],
    renderer: (cardItem) => {
      const card = new Card(cardItem, cardSelector);
      const cardElement = card.generateCard();
      cardsList.setItem(cardElement);
    },
  },
    cardsElementSelector
  );
  addNewCard.createItems();
  formNewCard.reset();
  popupAddCard.close();
}

export { handleCardClick };
