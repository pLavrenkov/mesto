class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  createItems() {
    this._items.forEach(element => {
      this._renderer(element);
    });
  }

  setItem(elem) {
    this._container.prepend(elem);
  }
}

/*
function createCard(array) {
  const card = new Card(array, cardSelector);
  const cardElement = card.generateCard();
  return cardElement;
}

function renderCard(item, container) {
  container.prepend(createCard(item));
}

function addArrCards(arr) {
  arr.forEach(el => {
    renderCard(el, cardsElementList);
  });
}
*/

export { Section };
