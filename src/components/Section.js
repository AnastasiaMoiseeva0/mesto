export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._items = [];
    this._container = container;
  }

  getById(id) {
    return this._items.find(card => card.getId() === id);
  }

  addItem(card) {
    this._container.prepend(card.getElement());
    this._items.unshift(card);
  }

  removeItem(id) {
    const indexToRemove = this._items.findIndex(card => card.getId() === id);
    let [ card ] = this._items.splice(indexToRemove, 1);

    card.removeCard();
  }

  renderItems(cards) {
    cards.forEach((item) => {
      this._renderer(item);
    });
  }
}
