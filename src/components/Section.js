export default class Section {
    constructor({items, renderer}, container) {
        this._renderer = renderer;
        this._initialArray = items;
        this._container = container;
    }

    addItem(placesElement) {
        this._container.prepend(placesElement);
    }

    renderItems() {
        this._initialArray.forEach((item) => {
            this._renderer(item);
        });
    }

}