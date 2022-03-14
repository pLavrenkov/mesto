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

export { Section };
