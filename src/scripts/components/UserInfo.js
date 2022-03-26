class UserInfo {
  constructor( nameSelector, jobSelector ) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this._nameElement = document.querySelector(this._nameSelector);
    this._jobElement = document.querySelector(this._jobSelector);
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
}

export { UserInfo };
