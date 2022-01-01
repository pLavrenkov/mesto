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

function addCard(title, image) {
  const cardElementTemplate = document.querySelector('#card-element').content;
  const cardsElementList = document.querySelector('.element-list');
  const cardElement = cardElementTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__title').textContent = title;
  cardElement.querySelector('.element__photo').src = image;
  cardsElementList.prepend(cardElement);
};

function addArrCards(arr) {
  arr.forEach(el => {
    addCard(el.name, el.link);
  });
};

document.addEventListener('DOMContentLoaded', addArrCards(initialCards));

// формирование переменных для pop-up
const openProfileButton = document.querySelector('.profile__edit-button');
const openNewCardButton = document.querySelector('.profile__add-button');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const popUpProfile = document.querySelectorAll('.pop-up')[0];
const closeProfileButton = popUpProfile.querySelector('.pop-up__button-close');
const nameInput = popUpProfile.querySelector('.pop-up__field:first-of-type');
const jobInput = popUpProfile.querySelector('.pop-up__field:last-of-type');
const formProfileElement = popUpProfile.querySelector('.pop-up__form');
const submitProfileButton = popUpProfile.querySelector('.pop-up__button-submit');
const popUpNewCard = document.querySelectorAll('.pop-up')[1];
const closePopUpNewCardButton = popUpNewCard.querySelector('.pop-up__button-close');
const titleInput = popUpNewCard.querySelector('.pop-up__field:first-of-type');
const imageInput = popUpNewCard.querySelector('.pop-up__field:last-of-type');
const formNewCardElement = popUpNewCard.querySelector('.pop-up__form');
const submitNewCardButton = popUpNewCard.querySelector('.pop-up__button-submit');

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
  addCard(titleInput.value, imageInput.value);
  const likeButton = document.querySelector('.element__like');
  likeButton.addEventListener('click', function (el) {
    el.target.classList.toggle('element__like_active');
  });
  const binButton = document.querySelector('.element__bin-button');
  binButton.addEventListener('click', function (el) {
    const item = el.target;
    item.parentElement.remove();
  });
  const imageButton = document.querySelector('.element__photo');
  imageButton.addEventListener('click', function(el) {
    const item = el.target;
    imagePopUpPhoto.src = takeImage(item);
    imagePopUpCaption.textContent = takeTitle(item);
    imagePopUpOpen();
  })
  popUpNewCardClose();
}
submitNewCardButton.addEventListener('click', formSubmitNewCardHandler);

// скрипт для лайков
let likeButtons = document.querySelectorAll('.element__like');

likeButtons.forEach(elem => {
  elem.addEventListener('click', function (el) {
    el.target.classList.toggle('element__like_active');
  });
});

// скрипт для корзины
let binButtons = document.querySelectorAll('.element__bin-button');

binButtons.forEach(elem => {
  elem.addEventListener('click', function (el) {
    const item = el.target;
    item.parentElement.remove();
  });
});

// скрипт открыть image pop-up
const imagesToOpen = document.querySelectorAll('.element__photo');
const imagePopUp = document.querySelector('.image-pop-up');
const imagePopUpPhoto = imagePopUp.querySelector('.image-pop-up__photo');
const imagePopUpCaption = imagePopUp.querySelector('.image-pop-up__caption');

function imagePopUpOpen() {
  imagePopUp.classList.add('image-pop-up_opened');
}

function takeImage(item) {
  return item.src
}

function takeTitle(item) {
  const nextItem = item.nextElementSibling;
  return nextItem.textContent;
}

imagesToOpen.forEach(elem => {
  elem.addEventListener('click', function (el) {
    const item = el.target;
    imagePopUpPhoto.src = takeImage(item);
    imagePopUpCaption.textContent = takeTitle(item);
    imagePopUpOpen();
  })
})

// скрипт закрыть image pop-up
const imagePopUpButtonClose = document.querySelector('.image-pop-up__close-button');
imagePopUpButtonClose.addEventListener('click', function () {
  imagePopUp.classList.remove('image-pop-up_opened');
});
