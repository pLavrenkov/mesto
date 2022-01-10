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
  const handleLikeButton = () => { //вынести обработчик в глобальную зону не удалось, т.к. кнопка создается внутри функции createCard
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
}

function renderCard(array, container) {
  const card = createCard(array);
  container.prepend(card);
}

function addArrCards(arr) {
  arr.forEach(el => {
    renderCard(el, cardsElementList);
  });
}

addArrCards(initialCards);

// скрипт для валидации input в формах
const resetValidation = (popUp) => {
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
}

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
  resetValidation(popUpProfile);
  enableValidation();
}

openProfileButton.addEventListener('click', openPopUpProfile);

// скрипт для закртыия pop-up Profile
function closePopUp(popUp) {
  popUp.removeEventListener('click', handleClosePopUpByLayout);
  document.removeEventListener('keydown', handleClosePopUpByEsc);
  popUp.classList.remove('pop-up_opened');

}

function closePopUpProfile() {
  closePopUp(popUpProfile);
}
closeProfileButton.addEventListener('click', closePopUpProfile);

// скрипт для заполнения формы pop-up Profile
function handleSubmitProfileForm(evt) {
  evt.preventDefault();
  //не удалил, т.к. в случае удаления при сабмите страница перезагружается и данные не сохраняются (остается Кусто и Исследователь),
  //но удалил в обработчике создения новой карточки
  //предположу, что это связано с заполнением полей в форме данными из профиля, т.к. на другом поп апе работает default от валидации
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopUpProfile();
}
submitProfileButton.addEventListener('click', handleSubmitProfileForm);

// скрипт для открытия pop-up NewCard
function openPopUpNewCard() {
  openPopUp(popUpNewCard);
  enableValidation();
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
