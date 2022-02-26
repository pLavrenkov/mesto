// глобальные переменные
const cardsElementList = document.querySelector('.element-list');
const openProfileButton = document.querySelector('.profile__edit-button');
const openNewCardButton = document.querySelector('.profile__add-button');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const popUpProfile = document.querySelector('#pop-up-profile');
const closeProfileButton = popUpProfile.querySelector('.pop-up__button-close');
const nameInput = popUpProfile.querySelector('#pop-up-form-profile-title');
const jobInput = popUpProfile.querySelector('#pop-up-form-profile-added-info');
const submitProfileButton = popUpProfile.querySelector('.pop-up-form__button-submit');
const popUpNewCard = document.querySelector('#pop-up-add-new-card');
const closePopUpNewCardButton = popUpNewCard.querySelector('.pop-up__button-close');
const titleInput = popUpNewCard.querySelector('#pop-up-form-new-card-title');
const imageInput = popUpNewCard.querySelector('#pop-up-form-new-card-added-info');
const submitNewCardButton = popUpNewCard.querySelector('.pop-up-form__button-submit');
const popUpPicture = document.querySelector('#pop-up-image-view');
const popUpPictureCaption = document.querySelector('.pop-up-picture__caption');
const popUpPicturePhoto = document.querySelector('.pop-up-picture__photo');
const closePopUpPicture = popUpPicture.querySelector('.pop-up__button-close');
const formNewCard = popUpNewCard.querySelector('.pop-up-form');
const cardSelector = '#card-element';

// объекты PopUp
const profileForm = {
  name: '[name =" profile-form"]',
  form: '.pop-up-form',
  input: '.pop-up-form__field',
  error: '.pop-up-form__input-error',
  error_active: 'pop-up-form__input-error_active',
  input_error: 'pop-up-form__field_type_error',
  button: '.pop-up-form__button-submit',
  selector: document.querySelector('[name = "profile-form"]')
};

const newCardForm = {
  name: '[name = "newcard-form"]',
  form: '.pop-up-form',
  input: '.pop-up-form__field',
  error: '.pop-up-form__input-error',
  error_active: 'pop-up-form__input-error_active',
  input_error: 'pop-up-form__field_type_error',
  button: '.pop-up-form__button-submit',
  selector: document.querySelector('[name = "newcard-form"]')
};

// скрипт для создания карточек
import { Card } from './Card.js';
import { FormValidation } from './FormValidator.js';

// формирование валицации
const profileValidation = new FormValidation (profileForm, profileForm.selector);
profileValidation.enableValidation();

const newCardValidation = new FormValidation (newCardForm, popUpNewCard);
newCardValidation.enableValidation();

// обработчики событий для закрытия pop up нажатием на overlay и на Escape
const handleClosePopUpByLayout = (event) => {
  const popUp = document.querySelector('.pop-up_opened');
  if (event.target === popUp) {
    closePopUp(event.target);
  }
};

const handleClosePopUpByEsc = (event) => {
  //const popUp = document.querySelector('.pop-up_opened');
  if (event.key === 'Escape') {
    const popUp = document.querySelector('.pop-up_opened');
    closePopUp(popUp);
    event.stopPropagation();
  }
};

// скрипт для открытия pop-up Profile и заполнения полей формы текущим значением
function openPopUp(popUp) {
  popUp.classList.add('pop-up_opened');
  popUp.addEventListener('click', handleClosePopUpByLayout);
  document.addEventListener('keydown', handleClosePopUpByEsc);
};

function openPopUpProfile() {
  openPopUp(popUpProfile);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  submitProfileButton.removeAttribute('disabled');
  profileValidation.resetValidation(); //сброс валидации только на PopUp с профилем, т.к. в PopUp с добавлением карточек после закрытия введеные значения остаются и ошибки тоже должны быть показаны
};

openProfileButton.addEventListener('click', openPopUpProfile);

// скрипт для закртыия pop-up Profile
function closePopUp(popUp) {
  popUp.classList.remove('pop-up_opened');
  popUp.removeEventListener('click', handleClosePopUpByLayout);
  document.removeEventListener('keydown', handleClosePopUpByEsc);
};

function closePopUpProfile() {
  closePopUp(popUpProfile);
};
closeProfileButton.addEventListener('click', closePopUpProfile);

// скрипт для заполнения формы pop-up Profile
function handleSubmitProfileForm() {
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopUpProfile();
}
submitProfileButton.addEventListener('click', handleSubmitProfileForm);

function handleCardClick(name, link) {
  popUpPicturePhoto.src = link;
  popUpPictureCaption.textContent = name;
  popUpPicturePhoto.alt = `Фотоизображение: ${name}`;
  openPopUp(popUpPicture);
}

function createCard(array) {
  const card = new Card(array, cardSelector);
  const cardElement = card.generateCard();
  return cardElement;
}

function renderCard(item, container) {
  container.prepend(createCard(item));
}

function addArrCards(arr) {
  arr.forEach(el => {
    renderCard(el, cardsElementList);
  });
}

addArrCards(initialCards);

// скрипт для открытия pop-up NewCard
function openPopUpNewCard() {
  newCardValidation.disactiveSubmitButton();
  openPopUp(popUpNewCard);
}
openNewCardButton.addEventListener('click', openPopUpNewCard);

// скрипт для закртыия pop-up NewCard
function closePopUpNewCard() {
  closePopUp(popUpNewCard);
}
closePopUpNewCardButton.addEventListener('click', closePopUpNewCard);

// скрипт для добавления новой карточки
function handleSubmitNewCardForm() {
  //disactiveSubmitNewCardButton();
  const data = {
    name: titleInput.value,
    link: imageInput.value
  };
  renderCard(data, cardsElementList);
  formNewCard.reset();
  closePopUpNewCard();
}
submitNewCardButton.addEventListener('click', handleSubmitNewCardForm);

//скрипт закрыть pop-up с картинкой
closePopUpPicture.addEventListener('click', function () {
  closePopUp(popUpPicture);
});

export {handleCardClick};
