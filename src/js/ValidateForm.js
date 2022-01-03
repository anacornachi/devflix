class ValidateForm {
  constructor() {
    this.form = document.querySelector("form");
    this.inputs = document.querySelectorAll("input");
    this.address = document.querySelector("[data-address]");
    this.state = document.querySelector("[data-state]");
    this.city = document.querySelector("[data-city]");
    this.neighborhood = document.querySelector("[data-neighborhood]");
    this.storage = new DataStorage();
    this.name = document.querySelector("[data-name]");
    this.email = document.querySelector("[data-email]");
    this.lastCepChecked = "";

    this.patterns = {
      email:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      rg: /(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)/,
      cep: /(^[0-9]{5})-?([0-9]{3}$)/,
    };

    this.inputs.forEach((input) =>
      input.addEventListener("keyup", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const inputField = event.target;
        this.password = document.querySelector("[data-password]").value;
        this.isValid(inputField);
      })
    );

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const fields = [...event.target.querySelectorAll("input")];

      const errors = fields
        .filter((field) => field.required)
        .filter((input) => {
          return input.classList.contains("is-invalid"), !input.value;
        });

      if (errors.length > 0) {
        errors.forEach((error) => {
          this.isValid(error);
        });
      } else {
        if (this.form.dataset.hasOwnProperty("signUp")) {
          this.mainData = {
            name: document.querySelector("[data-name]").value,
            email: document.querySelector("[data-email]").value,
            password: document.querySelector("[data-password]").value,
          };
          this.storage.addNewUser(this.mainData);
        } else if (this.form.dataset.hasOwnProperty("signIn")) {
          this.mainData = {
            email: document.querySelector("[data-email]").value,
            password: document.querySelector("[data-password]").value,
          };
          this.storage.login(this.mainData);
        } else {
          this.storage.recovery(input);
        }
      }
    });
  }

  isValid(input) {
    const isValid = this.validateField(input);
    this.clearErrors(input);
    if (isValid) {
      input.style.borderColor = "#157951";
      input.classList.add("is-valid");
    } else {
      input.style.borderColor = "#ff0000";
      input.classList.add("is-invalid");
    }
  }

  clearErrors(field) {
    field.classList.remove("is-valid");
    field.classList.remove("is-invalid");
  }

  validateField(field) {
    const { name, value } = field;

    switch (name) {
      case "name":
        if (value.length >= 3) {
          return true;
        }
      case "email":
        if (this.patterns[name] && this.patterns[name].test(value) == true) {
          return true;
        }
      case "rg":
        if (this.patterns[name] && this.patterns[name].test(value) == true) {
          return true;
        }
      case "password":
        if (value.length >= 8) {
          return true;
        }
      case "confirm-password":
        if (value.length >= 8 && value == this.password) {
          return true;
        }
      case "cep":
        if (this.patterns[name] && this.patterns[name].test(value) == true) {
          console.log(this.lastCepChecked);
          if (value !== this.lastCepChecked) {
            this.lastCepChecked = value;
            this.queryCep(value);
            return true;
          }
          return;
        }
      case "number":
        if (value > 0) {
          return true;
        }
      default:
        return false;
    }
  }

  queryCep(code) {
    fetch(`https://viacep.com.br/ws/${code}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.erro == true) {
          throw new Error();
        } else {
          this.address.value = data.logradouro;
          this.state.value = data.uf;
          this.city.value = data.localidade;
          this.neighborhood.value = data.bairro;
        }
      })
      .catch((error) => {
        this.cep = document.querySelector("[data-cep]");
        this.errorMessage = document.querySelector("[data-invalid-cep]");
        this.cep.style.borderColor = "#ff0000";
        this.cep.classList.add("is-invalid");
        this.errorMessage.innerText = "CEP inválido. Tente novamente";
      });
  }
}
const validate = new ValidateForm();
