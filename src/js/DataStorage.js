class DataStorage {
  constructor() {
    this.users;

    this.getStorage();
  }

  getStorage() {
    const users = JSON.parse(localStorage.getItem("users"));

    if (users === null) {
      localStorage.setItem("users", "[]");
      this.users = [];
      return;
    }

    this.users = users;
  }

  addNewUser(newUser) {
    if (this.users.filter((user) => user.email == newUser.email).length > 0) {
      console.log(
        "Não foi possível criar sua conta pois essa conta já existe. Faça login"
      );
    } else {
      this.users.push(newUser);
      this.save();
    }
  }

  save() {
    localStorage.setItem("users", JSON.stringify(this.users));
  }
}
