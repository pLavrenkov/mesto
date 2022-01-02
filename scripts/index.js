//скрипт для вывода 6 предустановленных карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function addCard() {
  const cardElementTemplate = document.querySelector('#card-element').content;
  const cardElement = cardElementTemplate.querySelector('.element').cloneNode(true);
  const likeButton = cardElement.querySelector('.element__like');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('element__like_active');
  });
  const binButton = cardElement.querySelector('.element__bin-button');
  binButton.addEventListener('click', function (el) {
    const item = el.target;
    item.parentElement.remove();
  });
  const imageButton = cardElement.querySelector('.element__photo');
  imageButton.addEventListener('click', function (el) {
    const item = el.target;
    imagePopUpPhoto.src = takeImage(item);
    imagePopUpCaption.textContent = takeTitle(item);
    imagePopUpOpen();
  });
  return cardElement;
}

function renderCard(title, image) {
  const cardsElementList = document.querySelector('.element-list');
  const cardElement = addCard();
  cardElement.querySelector('.element__title').textContent = title;
  cardElement.querySelector('.element__photo').src = image;
  cardElement.querySelector('.element__photo').alt = `Фотоизображение ${title}`;
  cardsElementList.prepend(cardElement);
}

function addArrCards(arr) {
  arr.forEach(el => {
    renderCard(el.name, el.link);
  });
}

document.addEventListener('DOMContentLoaded', addArrCards(initialCards));

// формирование переменных для pop-up
const openProfileButton = document.querySelector('.profile__edit-button');
const openNewCardButton = document.querySelector('.profile__add-button');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const popUpProfile = document.querySelectorAll('.pop-up')[0];
const closeProfileButton = popUpProfile.querySelector('.pop-up__button-close');
const nameInput = popUpProfile.querySelector('.pop-up-form__field:first-of-type');
const jobInput = popUpProfile.querySelector('.pop-up-form__field:last-of-type');
//const formProfileElement = popUpProfile.querySelector('.pop-up-form');
const submitProfileButton = popUpProfile.querySelector('.pop-up-form__button-submit');
const popUpNewCard = document.querySelectorAll('.pop-up')[1];
const closePopUpNewCardButton = popUpNewCard.querySelector('.pop-up__button-close');
const titleInput = popUpNewCard.querySelector('.pop-up-form__field:first-of-type');
const imageInput = popUpNewCard.querySelector('.pop-up-form__field:last-of-type');
//const formNewCardElement = popUpNewCard.querySelector('.pop-up-form');
const submitNewCardButton = popUpNewCard.querySelector('.pop-up-form__button-submit');
const popUpPicture = document.querySelectorAll('.pop-up')[2];
const closePopUpPicture = popUpPicture.querySelector('.pop-up__button-close');

// скрипт для открытия pop-up Profile и заполнения полей формы текущим значением
function popUpOpen(popUp) {
  popUp.classList.add('pop-up_opened');
}

function popUpProfileOpen() {
  popUpOpen(popUpProfile);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

openProfileButton.addEventListener('click', popUpProfileOpen);

// скрипт для закртыия pop-up Profile
function popUpClose(popUp) {
  popUp.classList.remove('pop-up_opened');
}

function popUpProfileClose() {
  popUpClose(popUpProfile);
}
closeProfileButton.addEventListener('click', popUpProfileClose);

// скрипт для заполнения формы pop-up Profile
function formSubmitProfileHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popUpProfileClose();
}
submitProfileButton.addEventListener('click', formSubmitProfileHandler);

// скрипт для открытия pop-up NewCard

function popUpNewCardOpen() {
  popUpOpen(popUpNewCard);
  titleInput.value = '';
  imageInput.value = '';
}

openNewCardButton.addEventListener('click', popUpNewCardOpen);

// скрипт для закртыия pop-up NewCard

function popUpNewCardClose() {
  popUpClose(popUpNewCard);
}
closePopUpNewCardButton.addEventListener('click', popUpNewCardClose);

// скрипт для добавления новой карточки
function formSubmitNewCardHandler(evt) {
  evt.preventDefault();
  renderCard(titleInput.value, imageInput.value);
  popUpNewCardClose();
}
submitNewCardButton.addEventListener('click', formSubmitNewCardHandler);

// скрипт открыть image pop-up

const imagePopUpPhoto = popUpPicture.querySelector('.pop-up-picture__photo');
const imagePopUpCaption = popUpPicture.querySelector('.pop-up-picture__caption');

function imagePopUpOpen() {
  popUpOpen(popUpPicture);
 // popUpPicture.classList.add('pop-up_opened');
}

function takeImage(item) {
  return item.src;
}

function takeTitle(item) {
  const nextItem = item.nextElementSibling;
  return nextItem.textContent;
}

//скрипт закрыть image pop-up
closePopUpPicture.addEventListener('click', function () {
  popUpClose(popUpPicture);
});
