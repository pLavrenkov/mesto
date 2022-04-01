//импорт css под webpack
import '../pages/index.css';

// импорты констант
import {
  cardsElementSelector,
  openNewCardButton,
  nameSelector,
  jobSelector,
  avatarSelector,
  openProfileButton,
  openAvatarEditButton,
  nameInput,
  jobInput,
  cardSelector,
  binSelector,
  // импорты настроек попапов
  popupSettings,
  userInfoPopup,
  avatarPopup,
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

// экземпляр класса Api
const api = new Api(
  {
    baseUrlMesto: 'https://mesto.nomoreparties.co/v1/cohort-38',
    baseUrlUser: 'https://nomoreparties.co/v1/cohort-38'
  },
  {
    authorization: '4668ff3a-c5ce-444d-bb20-dac560596bbe',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
);

// установка информации о пользователе
const makeUserInfo = new UserInfo(nameSelector, jobSelector, avatarSelector);

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    const userId = userData._id;
    makeUserInfo.setUserInfo(userData.name, userData.about);
    makeUserInfo.setAvatar(userData);
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
    });
    popupAddCard.setEventListeners();
    // слушатели событий для попапа с новой карточкой
    openNewCardButton.addEventListener('click', function () {
      newCardValidation.disactiveSubmitButton();
      newCardValidation.resetValidation();
      popupAddCard.open();
    });
    // создание новой карточки с функцией удаления
    function createCard(cardItem) {
      const card = new Card(cardItem, cardSelector, handleCardClick, api, userId, binSelector, popupDeleteCard);
      const cardElement = card.generateCard();
      return cardElement;
    }
    // обработчик новой карточки
    function handleSubmitNewCardForm(data) {
      const bigdata = {
        name: data.title,
        link: data.info
      };
      popupAddCard.renderLoading('Сохранение...');
      api.putNewCard(bigdata.name, bigdata.link)
        .then(obj => {
          cardSection.setItem(createCard(obj));
          popupAddCard.close();
        })
        .catch(err => {
          alert(`При создании карточки возникла ошибка ${err}`);
        })
        .finally(res => {
          popupAddCard.renderLoading('Сохранить');
          return res;
        });
    }
  })
  .catch(err => {
    alert(`При получении данных с сервера возникла ошибка ${err}`);
  });

// обогащение индивидуальных обхектов с попапами общими данными
const userInfoPopupUpgrade = Object.assign(userInfoPopup, popupSettings);
const avatarPopupUpgrade = Object.assign(avatarPopup, popupSettings);
const imagePopupUpgrade = Object.assign(imagePopup, popupSettings);
const newCardPopupUpgrade = Object.assign(newCardPopup, popupSettings);
const deletePopupUpgrade = Object.assign(deletePopup, popupSettings);

// формирование валицации
const profileValidation = new FormValidation(popupSettings, userInfoPopupUpgrade.formElement);
profileValidation.enableValidation();

const avatarValidation = new FormValidation(popupSettings, avatarPopupUpgrade.formElement);
avatarValidation.enableValidation();

const newCardValidation = new FormValidation(popupSettings, newCardPopupUpgrade.formElement);
newCardValidation.enableValidation();



const popupUserInfo = new PopupWithForm(userInfoPopupUpgrade, function ({ title, info }) {
  popupUserInfo.renderLoading('Сохранение...');
  api.patchUserInfo(title, info)
    .then(res => {
      makeUserInfo.setUserInfo(title, info);
      popupUserInfo.close();
      return res;
    })
    .catch(err => {
      alert(`При обновлении данных пользователя возникла ошибка ${err}`);
    })
    .finally(res => {
      popupUserInfo.renderLoading('Сохранить');
      return res;
    });
});
popupUserInfo.setEventListeners();

openProfileButton.addEventListener('click', function () {
  const userInfo = makeUserInfo.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.job;
  profileValidation.resetValidation();
  popupUserInfo.open();
});

// установка аватара
const popupAvatar = new PopupWithForm(avatarPopupUpgrade, function (urlObj) {
  popupAvatar.renderLoading('Сохранение...');
  api.patchAvatar(urlObj.info)
    .then(user => {
      makeUserInfo.setAvatar(user);
      popupAvatar.close();
    })
    .catch(err => {
      alert(`При обновлении аватара возникла ошибка ${err}`);
    })
    .finally(res => {
      popupAvatar.renderLoading('Сохранить');
      return res;
    });
});
popupAvatar.setEventListeners();

openAvatarEditButton.addEventListener('click', function () {
  avatarValidation.disactiveSubmitButton();
  avatarValidation.resetValidation();
  popupAvatar.open();
})

// демонстрация картинки
const pictureView = new PopupWithImage(imagePopupUpgrade);
pictureView.setEventListeners();

function handleCardClick(name, link) {
  const data = {
    name: name,
    link: link
  }
  pictureView.open(data);
}

function handleDeleteCard(card, cardItem) {
  api.deleteCard(card._id)
    .then(res => {
      cardItem.remove();
      popupDeleteCard.close();
    })
    .catch(err => {
      alert(`При удалении карточки возникла ошибка ${err}`);
    });
}

const popupDeleteCard = new PopupDeleteCard(deletePopupUpgrade, handleDeleteCard);
popupDeleteCard.setEventListeners();
