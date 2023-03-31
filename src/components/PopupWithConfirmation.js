import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popup, config, handleSubmit) {
    super(popup);
    this._handleSubmitCallback = handleSubmit;
    this._form = this._popupElement.querySelector(config.editFormSelector);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  open(id) {
    super.open();
    this._id = id;
  }

  _addEventListeners() {
    super._addEventListeners();
    this._form.addEventListener("submit", this._handleSubmit); 
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener("submit", this._handleSubmit);
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    
    if (this._handleSubmitCallback) {
      this._handleSubmitCallback(this._id);
    }

    this.close();
  }
}
