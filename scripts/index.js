// формирование переменных
let openButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.pop-up__button-close');
let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');
let popUp = document.querySelector('.pop-up');
let nameInput = document.querySelector('.pop-up__field:first-of-type');
let jobInput = document.querySelector('.pop-up__field:last-of-type');
let formElement = document.querySelector('.pop-up__form');
let submitButton = document.querySelector('.pop-up__button-submit');

// скрипт для открытия pop-up и заполнения полей формы текущим значением
function popUpOpen() {
  let name = nameProfile.textContent;
  nameInput.setAttribute('value', name);
  let job = jobProfile.textContent;
  jobInput.setAttribute('value', job);
  popUp.classList.add('pop-up_opened');
}

openButton.addEventListener('click', popUpOpen);

// скрипт для закртыия pop-up
function popUpClose() {
  popUp.classList.remove('pop-up_opened');
}

closeButton.addEventListener('click', popUpClose);

// скрипт для заполнения формы
let nameInput1 = document.querySelector('.pop-up__field:first-of-type');
let jobInput1 = document.querySelector('.pop-up__field:last-of-type');
function formSubmitHandler (evt) {
  evt.preventDefault();
  let nameNew = nameInput1.getAttribute('value');
  let jobNew = jobInput1.getAttribute('value');
  console.log(nameNew);
  nameProfile.textContent = nameNew;
  jobProfile.textContent = jobNew;
  popUpClose();
}

submitButton.addEventListener('click', formSubmitHandler);
