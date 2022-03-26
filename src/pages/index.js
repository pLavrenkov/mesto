//импорт css под webpack
import '../pages/index.css';

// импорты констант
import {
  cardsElementSelector,
  openNewCardButton,
  nameSelector,
  jobSelector,
  openProfileButton,
  nameInput,
  jobInput,
  cardSelector,
  initialCards,
  // импорты настроек попапов
  popupSettings,
  userInfoPopup,
  newCardPopup,
  imagePopup
} from '../scripts/utils/constnts.js';

// импорты модулей
import { Card } from '../scripts/components/Card.js';
import { FormValidation } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';

const userInfoPopupUpgrade = Object.assign(userInfoPopup, popupSettings);
const imagePopupUpgrade = Object.assign(imagePopup, popupSettings);
const newCardPopupUpgrade = Object.assign(newCardPopup, popupSettings);

// формирование валицации
const profileValidation = new FormValidation(popupSettings, userInfoPopupUpgrade.formElement);
profileValidation.enableValidation();

const newCardValidation = new FormValidation(popupSettings, newCardPopupUpgrade.formElement);
newCardValidation.enableValidation();

//обработка popup с user info
const makeUserInfo = new UserInfo(nameSelector, jobSelector);

const popupUserInfo = new PopupWithForm(userInfoPopupUpgrade, function ({ title, info }) {
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

const pictureView = new PopupWithImage(imagePopupUpgrade);
pictureView.setEventListeners();

function handleCardClick(name, link) {
  const data = {
    name: name,
    link: link
  }
  pictureView.open(data);
}

let dataCards = initialCards;

const cardSection = new Section({
  items: dataCards,
  renderer: (cardItem) => {
    const newCard = createCard(cardItem);
    cardSection.setItem(newCard);
  },
},
  cardsElementSelector
);
cardSection.createItems();

//popup для новых карточек
const popupAddCard = new PopupWithForm(newCardPopupUpgrade, function (data) {
  handleSubmitNewCardForm(data);
  popupAddCard.close();
});
popupAddCard.setEventListeners();

openNewCardButton.addEventListener('click', function () {
  newCardValidation.disactiveSubmitButton();
  newCardValidation.resetValidation();
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
  //const newCard = createCard(bigdata);
  cardSection.setItem(createCard(bigdata));
}
