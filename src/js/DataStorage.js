class DataStorage {
  constructor() {
    this.users;
    this.fields = document.querySelectorAll("input");
    this.modal = document.querySelector("[data-modal]");
    this.modal = new Modal();
    this.getStorage();
  }

  getStorage() {
    const users = JSON.parse(localStorage.getItem("users"));

    if (!users) {
      localStorage.setItem("users", "[]");
      return (this.users = []);
    }

    this.users = users;
  }

  addNewUser(newUser) {
    if (this.users.filter((user) => user.email == newUser.email).length > 0) {
      this.modal.open();
    } else {
      this.users.push(newUser);
      this.save();
      return (window.location.href = "/src/pages/login.html");
    }
  }

  login(userData) {
    if (this.users.filter((user) => user.email == userData.email).length > 0) {
      const storedData = this.users.filter(
        (user) => user.email == userData.email
      );
      const isValid = storedData[0].password === userData.password;
      if (isValid) {
        return (window.location.href = "/src/pages/home-page.html");
      }
      //tratar a senha errada
    }
    this.modal.open();
  }

  save() {
    localStorage.setItem("users", JSON.stringify(this.users));
  }
}
