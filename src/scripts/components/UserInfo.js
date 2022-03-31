class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this._avatarSelector = avatarSelector;
    this._nameElement = document.querySelector(this._nameSelector);
    this._jobElement = document.querySelector(this._jobSelector);
    this._avatarElement = document.querySelector(this._avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    };
    return userInfo;
  }

  setUserInfo(name, job) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }

  setAvatar(user) {
    this._avatarElement.src = user.avatar;
  }
}

export { UserInfo };
