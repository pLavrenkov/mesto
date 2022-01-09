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

// скрипт для создания карточек
function createCard(cardObject) {
  const cardElementTemplate = document.querySelector('#card-element').content;
  const cardElement = cardElementTemplate.querySelector('.element').cloneNode(true);
  const imageButton = cardElement.querySelector('.element__photo');
  const title = cardObject.name;
  const image = cardObject.link;
  cardElement.querySelector('.element__title').textContent = title;
  imageButton.src = image;
  imageButton.alt = `Фотоизображение: ${title}`;
  const likeButton = cardElement.querySelector('.element__like');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('element__like_active');
  });
  const binButton = cardElement.querySelector('.element__bin-button');
  binButton.addEventListener('click', function (event) {
    const item = event.target;
    item.parentElement.remove();
  });
  imageButton.addEventListener('click', function () {
    imagePopUpPhoto.src = imageButton.src;
    imagePopUpCaption.textContent = cardObject.name;
    imageButton.alt = `Фотоизображение: ${imagePopUpCaption.textContent}`;
    popUpOpen(popUpPicture);
  });
  return cardElement;
}

function renderCard(massive, container) {
  const card = createCard(massive);
  container.prepend(card);
}

function addArrCards(arr) {
  arr.forEach(el => {
    renderCard(el, cardsElementList);
  });
}

addArrCards(initialCards);

// скрипт для открытия pop-up Profile и заполнения полей формы текущим значением
function popUpOpen(popUp) {
  popUp.classList.add('pop-up_opened');
  const elementButton = popUp.querySelector('.pop-up-form__button-submit');
  if (popUp.id === 'pop-up-add-new-card' || popUp.id === 'pop-up-profile') {
    elementButton.classList.add('pop-up-form__button-submit_disabled');
    elementButton.setAttribute('disabled', true);
  }
}

function popUpProfileOpen() {
  popUpOpen(popUpProfile);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

openProfileButton.addEventListener('click', popUpProfileOpen);

// скрипт для закртыия pop-up Profile
function popUpClose(popUp) {
  const formElementList = Array.from(popUp.querySelectorAll('.pop-up-form__field'));
  const elementErrorList = Array.from(popUp.querySelectorAll('.pop-up-form__input-error'));
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
  popUp.classList.remove('pop-up_opened');
}

function popUpProfileClose() {
  popUpClose(popUpProfile);
}
closeProfileButton.addEventListener('click', popUpProfileClose);

// скрипт для заполнения формы pop-up Profile
function handleSubmitProfileForm(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popUpProfileClose();
}
submitProfileButton.addEventListener('click', handleSubmitProfileForm);

// скрипт для открытия pop-up NewCard
function openPopUpNewCard() {
  popUpOpen(popUpNewCard);
  formNewCard.reset();
}

openNewCardButton.addEventListener('click', openPopUpNewCard);

// скрипт для закртыия pop-up NewCard
function closePopUpNewCard() {
  popUpClose(popUpNewCard);
}
closePopUpNewCardButton.addEventListener('click', closePopUpNewCard);

// скрипт для добавления новой карточки
function handleSubmitNewCardForm(evt) {
  evt.preventDefault();
  const data = {
    name: titleInput.value,
    link: imageInput.value
  };
  renderCard(data, cardsElementList);
  closePopUpNewCard();
}
submitNewCardButton.addEventListener('click', handleSubmitNewCardForm);

//скрипт закрыть pop-up с картинкой
closePopUpPicture.addEventListener('click', function () {
  popUpClose(popUpPicture);
});

// скрипт для закртыия pop up кликом на подложку и через esc
const setEventPopUpClose = () => {
  const popUpList = Array.from(document.querySelectorAll('.pop-up'));
  popUpList.forEach((popUp) => {
    popUp.addEventListener('click', function (event) {
      popUpClose(event.target);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        popUpClose(popUp);
      }
    });
  });
};

setEventPopUpClose();
