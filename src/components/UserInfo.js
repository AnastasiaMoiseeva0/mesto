export default class UserInfo {
  constructor({ profileName, profileProfession, newAvatar }) {
    this._profileName = profileName;
    this._profileProfession = profileProfession;
    this._newAvatar = newAvatar;
  }

  getUserInfo() {
    return {
      job: this._profileProfession.textContent,
      name: this._profileName.textContent,
      link: this._newAvatar.src,
    };
  }

  getId() {
    return this._id;
  }

  setUserInfo({ name, job, id, link }) {
    this._profileName.textContent = name;
    this._profileProfession.textContent = job;
    this._id = id;
    this._newAvatar.src = link;
  }
}
