// формирование переменных
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
const closePopUpPicture = popUpPicture.querySelector('.pop-up__button-close');
const imagePopUpPhoto = popUpPicture.querySelector('.pop-up-picture__photo');
const imagePopUpCaption = popUpPicture.querySelector('.pop-up-picture__caption');
const formNewCard = popUpNewCard.querySelector('.pop-up-form');
const formElementList = Array.from(popUpProfile.querySelectorAll('.pop-up-form__field'));
const elementErrorList = Array.from(popUpProfile.querySelectorAll('.pop-up-form__input-error'));
const cardSelector = '#card-element';

const profileForm = {
  name: '[name =" profile-form"]',
  form: '.pop-up-form',
  input: '.pop-up-form__field',
  selector: document.querySelector('[name = "profile-form"]')
}

const newCardForm = {
  name: '[name = "newcard-form"]',
  form: '.pop-up-form',
  input: '.pop-up-form__field',
  selector: document.querySelector('[name = "newcard-form"]')
}

console.log(newCardForm.selector);


// скрипт для создания карточек
import { Card } from './Card.js';
import { FormValidation } from './FormValidator.js';

/*function createCard(cardObject) {
  const cardElementTemplate = document.querySelector('#card-element').content;
  const cardElement = cardElementTemplate.querySelector('.element').cloneNode(true);
  const imageButton = cardElement.querySelector('.element__photo');
  const title = cardObject.name;
  const image = cardObject.link;
  cardElement.querySelector('.element__title').textContent = title;
  imageButton.src = image;
  imageButton.alt = `Фотоизображение: ${title}`;
  const likeButton = cardElement.querySelector('.element__like');
  const handleLikeButton = () => {
    likeButton.classList.toggle('element__like_active');
  }
  likeButton.addEventListener('click', handleLikeButton);
  const binButton = cardElement.querySelector('.element__bin-button');
  binButton.addEventListener('click', function (event) {
    const item = event.target;
    item.closest('.element').remove();
  });
  imageButton.addEventListener('click', function () {
    imagePopUpPhoto.src = imageButton.src;
    imagePopUpCaption.textContent = cardObject.name;
    imagePopUpPhoto.alt = `Фотоизображение: ${imagePopUpCaption.textContent}`;
    openPopUp(popUpPicture);
  });
  return cardElement;
}*/

// обработчики событий для закрытия pop up нажатием на overlay и на Escape
const handleClosePopUpByLayout = (event) => {
  closePopUp(event.target);
}

const handleClosePopUpByEsc = (event) => {
  const popUp = document.querySelector('.pop-up_opened');
  if (event.key === 'Escape') {
    closePopUp(popUp);
  }
}

function renderCard(array, container) {
  const card = new Card(array, cardSelector);
  const cardElement = card.generateCard();
  cardElement.querySelector('.element__photo').addEventListener('click', function () {
    openPopUp(popUpPicture);
  });
  container.prepend(cardElement);
}

function addArrCards(arr) {
  arr.forEach(el => {
    renderCard(el, cardsElementList);
  });
}

addArrCards(initialCards);

const profileValidation = new FormValidation (profileForm, profileForm.selector);
profileValidation.enableValidation();
console.log(profileValidation);

const newCardValidation = new FormValidation (newCardForm, popUpNewCard);
newCardValidation.enableValidation();
console.log(newCardValidation);

// скрипт для валидации input в формах
const resetValidationPopUpProfile = () => {
  formElementList.forEach((formElement) => {
    if (formElement.classList.contains('pop-up-form__field_type_error')) {
      formElement.classList.remove('pop-up-form__field_type_error');
    }
  });
  elementErrorList.forEach((elementError) => {
    if (elementError.classList.contains('pop-up-form__input-error_active')) {
      elementError.classList.remove('pop-up-form__input-error_active');
    }
  });
}



// скрипт для открытия pop-up Profile и заполнения полей формы текущим значением
function openPopUp(popUp) {
  popUp.classList.add('pop-up_opened');
  popUp.addEventListener('click', handleClosePopUpByLayout);
  document.addEventListener('keydown', handleClosePopUpByEsc);
}

function openPopUpProfile() {
  openPopUp(popUpProfile);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  submitProfileButton.removeAttribute('disabled');
  resetValidationPopUpProfile();
}

openProfileButton.addEventListener('click', openPopUpProfile);

// скрипт для закртыия pop-up Profile
function closePopUp(popUp) {
  //popUp.removeEventListener('click', handleClosePopUpByLayout);
  document.removeEventListener('keyup', handleClosePopUpByEsc);
  popUp.classList.remove('pop-up_opened');

}

function closePopUpProfile() {
  closePopUp(popUpProfile);
}
closeProfileButton.addEventListener('click', closePopUpProfile);

// скрипт для заполнения формы pop-up Profile
function handleSubmitProfileForm(evt) {
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopUpProfile();
}
submitProfileButton.addEventListener('click', handleSubmitProfileForm);

// скрипт для открытия pop-up NewCard
function openPopUpNewCard() {
  openPopUp(popUpNewCard);
}
openNewCardButton.addEventListener('click', openPopUpNewCard);

// скрипт для закртыия pop-up NewCard
function closePopUpNewCard() {
  closePopUp(popUpNewCard);
}
closePopUpNewCardButton.addEventListener('click', closePopUpNewCard);

// скрипт для дизактивации submit на pop up при создании новых карточек
function disactiveSubmitNewCardButton() {
  submitNewCardButton.setAttribute('disabled', true);
}
disactiveSubmitNewCardButton();

// скрипт для добавления новой карточки
function handleSubmitNewCardForm(evt) {
  disactiveSubmitNewCardButton();
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
