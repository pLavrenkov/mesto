//импорт css под webpack
import '../pages/index.css';

// импорты констант
import { cardsElementSelector } from '../scripts/utils/constnts.js';
import { openNewCardButton } from '../scripts/utils/constnts.js';
import { nameSelector } from '../scripts/utils/constnts.js';
import { jobSelector } from '../scripts/utils/constnts.js';
import { openProfileButton } from '../scripts/utils/constnts.js';
import { popUpProfile } from '../scripts/utils/constnts.js';
import { nameInput } from '../scripts/utils/constnts.js';
import { jobInput } from '../scripts/utils/constnts.js';
import { popUpNewCard } from '../scripts/utils/constnts.js';
import { titleInput } from '../scripts/utils/constnts.js';
import { imageInput } from '../scripts/utils/constnts.js';
import { formNewCard } from '../scripts/utils/constnts.js';
import { cardSelector } from '../scripts/utils/constnts.js';

// импорты объектов попапов и форм
import { popupSettings } from '../scripts/utils/constnts.js';
import { profileForm } from '../scripts/utils/constnts.js';
import { newCardForm } from '../scripts/utils/constnts.js';
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
import { initialCards } from '../scripts/cards.js';

// формирование валицации
const profileValidation = new FormValidation(profileForm, profileForm.selector);
profileValidation.enableValidation();

const newCardValidation = new FormValidation(newCardForm, popUpNewCard);
newCardValidation.enableValidation();

//обработка popup с user info
const makeUserInfo = new UserInfo(nameSelector, jobSelector);

const popupUserInfo = new PopupWithForm(userInfoPopup, function () {
  makeUserInfo.setUserInfo(nameInput.value, jobInput.value);
  popupUserInfo.close();
});

openProfileButton.addEventListener('click', function () {
  const userInfo = makeUserInfo.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.job;
  profileValidation.resetValidation();
  popupUserInfo.open();
  popupUserInfo.setEventListeners();
});

function handleCardClick(name, link) {
  const data = {
    name: name,
    link: link
  }
  const pictureView = new PopupWithImage(data, imagePopup);
  pictureView.open();
  pictureView.setEventListeners();
  document.querySelector(imagePopup.image).addEventListener('click', function () {
    pictureView.close();
  });
}

//формирование карточек
const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem, cardSelector);
    const cardElement = card.generateCard();
    cardsList.setItem(cardElement);
  },
},
  cardsElementSelector
);

cardsList.createItems();

//popup для новых карточек
const popupAddCard = new PopupWithForm(newCardPopup, function () {
  handleSubmitNewCardForm();
  popupAddCard.close();
});

openNewCardButton.addEventListener('click', function () {
  newCardValidation.disactiveSubmitButton();
  popupAddCard.open();
  popupAddCard.setEventListeners();
})

function handleSubmitNewCardForm() {
  const data = {
    name: titleInput.value,
    link: imageInput.value
  };
  const addNewCard = new Section({
    items: [data],
    renderer: (cardItem) => {
      const card = new Card(cardItem, cardSelector);
      const cardElement = card.generateCard();
      cardsList.setItem(cardElement);
    },
  },
    cardsElementSelector
  );
  addNewCard.createItems();
  formNewCard.reset();
  popupAddCard.close();
}

export { handleCardClick };
