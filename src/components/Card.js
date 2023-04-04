export default class Card {
  constructor(cardData, placeTemplate, canBeDeleted, liked, handleCardClick, handleCardDelete, handleCardLike) {
    this._placeTemplate = placeTemplate;
    this._cardData = cardData;
    this._canBeDeleted = canBeDeleted;
    this._liked = liked;
    this._card = this._getCard();
    this._buttonLike = this._card.querySelector(".place__icon-like");
    this._newCardImage = this._card.querySelector(".place_url");
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._likeCounter = this._card.querySelector(".place__like-counter");
    this._buttonTrash = this._card.querySelector(".place__icon-trash");
    this._handleCardLike = handleCardLike;
  }

  getId() {
    return this._cardData._id;
  }

  getElement() {
    this._setEventListeners();
    this._setAttributes();
    return this._card;
  }

  removeCard() {
    this._card.remove();
    this._card = null;
  }

  toggleLike() {
    if(this._liked) {
      this._buttonLike.classList.add("place__icon-like_active");
    } else {
      this._buttonLike.classList.remove("place__icon-like_active");
    }
  }

  updateData(cardData) {
    this._cardData = cardData;
    this._setAttributes();
  }

  _getCard() {
    return this._placeTemplate.firstElementChild.cloneNode(true);
  }

  _setAttributes() {
    this._newCardImage.src = this._cardData.link;
    this._card.querySelector(".place__title").textContent = this._cardData.name;
    this._newCardImage.alt = this._cardData.name;
    this._likeCounter.textContent = this._cardData.likes.length;
    this._buttonTrash.style.display = this._canBeDeleted ? 'inherit' : 'none';
    this.toggleLike();
  }

  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => {
      this._liked = !this._liked;
      this._handleCardLike(this, this._liked);
    });

    this._buttonTrash
      .addEventListener("click", () => {
        this._handleCardDelete(this);
      });

    this._newCardImage.addEventListener("click", () => {
      this._handleCardClick(this._cardData);
    });
  }
}
