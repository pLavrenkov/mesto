//импорт css под webpack
import '../pages/index.css';

// импорты констант
import { cardsElementSelector } from '../scripts/utils/constnts.js';
import { openNewCardButton } from '../scripts/utils/constnts.js';
import { nameSelector } from '../scripts/utils/constnts.js';
import { jobSelector } from '../scripts/utils/constnts.js';
import { openProfileButton } from '../scripts/utils/constnts.js';
import { nameInput } from '../scripts/utils/constnts.js';
import { jobInput } from '../scripts/utils/constnts.js';
import { cardSelector } from '../scripts/utils/constnts.js';
import { initialCards } from '../scripts/utils/constnts.js';

// импорты объектов попапов и форм
import { popupSettings } from '../scripts/utils/constnts.js';
import { userInfoPopup } from '../scripts/utils/constnts.js';
import { newCardPopup } from '../scripts/utils/constnts.js';
import { imagePopup } from '../scripts/utils/constnts.js';

// импорты модулей
import { Card } from '../scripts/components/Card.js';
import { FormValidation } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';

Object.assign(userInfoPopup, popupSettings);
Object.assign(imagePopup, popupSettings);
Object.assign(newCardPopup, popupSettings);

// формирование валицации
const profileValidation = new FormValidation(popupSettings, userInfoPopup.formElement);
profileValidation.enableValidation();

const newCardValidation = new FormValidation(popupSettings, newCardPopup.formElement);
newCardValidation.enableValidation();

//обработка popup с user info
const makeUserInfo = new UserInfo(nameSelector, jobSelector);

const popupUserInfo = new PopupWithForm(userInfoPopup, function ({ title, info }) {
  makeUserInfo.setUserInfo(title, info);
  popupUserInfo.close();
});
popupUserInfo.setEventListeners();

openProfileButton.addEventListener('click', function () {
  const userInfo = makeUserInfo.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.job;
  profileValidation.resetValidation();
  popupUserInfo.open();
});

const pictureView = new PopupWithImage(imagePopup);
pictureView.setEventListeners();

function handleCardClick(name, link) {
  const data = {
    name: name,
    link: link
  }
  pictureView.open(data);
}

//формирование карточек
function doSection(items) {
  const addNewCard = new Section({
    items,
    renderer: (cardItem) => {
      const newCard = createCard(cardItem);
      addNewCard.setItem(newCard);
    },
  },
  cardsElementSelector
  );
  addNewCard.createItems();
}

doSection(initialCards);

//popup для новых карточек
const popupAddCard = new PopupWithForm(newCardPopup, function (data) {
  handleSubmitNewCardForm(data);
  popupAddCard.close();
});
popupAddCard.setEventListeners();

openNewCardButton.addEventListener('click', function () {
  newCardValidation.disactiveSubmitButton();
  popupAddCard.open();
});

function createCard(cardItem) {
  const card = new Card(cardItem, cardSelector, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleSubmitNewCardForm(data) {
  const bigdata = {
    name: data.title,
    link: data.info
  };
doSection([bigdata]);
}
