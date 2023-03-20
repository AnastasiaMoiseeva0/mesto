export default class UserInfo {
    constructor({profileName, profileProfession}) {
        this._profileName = profileName;
        this._profileProfession = profileProfession;
    }

    getUserInfo() {
        return {
            job: this._profileProfession.textContent,
            name: this._profileName.textContent,
        }
    }

    setUserInfo({name, job}) {
        this._profileName.textContent = name;
        this._profileProfession.textContent = job;
    }
}