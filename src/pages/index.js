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
  imagePopup,
  deletePopup
} from '../scripts/utils/constnts.js';

// импорты модулей
import { Card } from '../scripts/components/Card.js';
import { FormValidation } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupDeleteCard } from '../scripts/components/PopupDeleteCard.js'
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Api } from '../scripts/components/Api.js'
//import { pop } from 'core-js/core/array';

const userApi = new Api(
  'https://nomoreparties.co/v1/cohort-38',
  {
    authorization: '4668ff3a-c5ce-444d-bb20-dac560596bbe',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
);

userApi.getUserInfo()
  .then(res => {
    console.log(res);
    document.querySelector('.profile__title').textContent = res.name;
    document.querySelector('.profile__subtitle').textContent = res.about;
    document.querySelector('.profile__avatar').src = res.avatar;
  });

const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-38',
  {
    authorization: '4668ff3a-c5ce-444d-bb20-dac560596bbe',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
);

const userInfoPopupUpgrade = Object.assign(userInfoPopup, popupSettings);
const imagePopupUpgrade = Object.assign(imagePopup, popupSettings);
const newCardPopupUpgrade = Object.assign(newCardPopup, popupSettings);
const deletePopupUpgrade = Object.assign(deletePopup, popupSettings);

// формирование валицации
const profileValidation = new FormValidation(popupSettings, userInfoPopupUpgrade.formElement);
profileValidation.enableValidation();

const newCardValidation = new FormValidation(popupSettings, newCardPopupUpgrade.formElement);
newCardValidation.enableValidation();

//обработка popup с user info
const makeUserInfo = new UserInfo(nameSelector, jobSelector);

const popupUserInfo = new PopupWithForm(userInfoPopupUpgrade, function ({ title, info }) {
  makeUserInfo.setUserInfo(title, info);
  userApi.patchUserInfo(title, info);
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

api.getInitialCards()
  .then(cards => {
    const cardSection = new Section({
      items: cards,
      renderer: (cardItem) => {
        const newCard = createCard(cardItem);
        cardSection.setItemAppend(newCard);
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
      const card = new Card(cardItem, cardSelector, handleCardClick, userApi);
      const cardElement = card.generateCard();
      const popupDeleteCard = new PopupDeleteCard(
        deletePopupUpgrade,
        function () {
          cardElement.remove();
          api.deleteCard(cardItem._id);
          popupDeleteCard.close();
        },
        cardItem._id);
      cardElement.querySelector('.element__bin-button').addEventListener('click', function () {
        popupDeleteCard.open();
        popupDeleteCard.setEventListeners();
      });
      return cardElement;
    }

    function handleSubmitNewCardForm(data) {
      const bigdata = {
        name: data.title,
        link: data.info
      };
      api.putNewCard(bigdata.name, bigdata.link)
      .then(obj => {
        console.log(obj);
        cardSection.setItem(createCard(obj));
      });
    }
  });



