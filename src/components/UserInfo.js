export default class UserInfo {
  constructor({ profileName, profileProfession }) {
    this._profileName = profileName;
    this._profileProfession = profileProfession;
  }

  getUserInfo() {
    return {
      job: this._profileProfession.textContent,
      name: this._profileName.textContent,
    };
  }

  getId() {
    return this._id;
  }

  setUserInfo({ name, job, id }) {
    this._profileName.textContent = name;
    this._profileProfession.textContent = job;
    this._id = id;
  }
}