class ValidateForm {
  constructor() {
    this.form = document.querySelector(".needs-validation");
    this.inputs = document.querySelectorAll("input");

    this.form.addEventListener("submit", (event) => {
      const fields = Object.keys(this.form).map((item) => this.form[item]);

      this.inputs = fields.map(({ name, value }) => ({ name, value }));
      this.password = document.querySelector("[data-password]").value;

      this.inputs.forEach((field) => this.validateInput(field, event));
      if (!this.form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  }

  valid(input) {
    input.classList.remove("is-invalid");
    return input.classList.add("is-valid");
  }

  invalid(input) {
    input.classList.remove("is-valid");
    return input.classList.add("is-invalid");
  }

  clearErrors() {
    //limpa todos os inputs
    //executa antes do switch
  }

  validateInput(field, event) {
    event.preventDefault();
    switch (field.name) {
      case "name":
        if (field.value.length >= 3) {
          return this.valid(event.target[field.name]);
        }
        return this.invalid(event.target[field.name]);
      case "email":
        const emailPattern =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const validateEmail = emailPattern.test(field.value);
        if (validateEmail == true) {
          return this.valid(event.target[field.name]);
        }
        return this.invalid(event.target[field.name]);
      case "rg":
        const rgPattern = /(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)/;
        const validateRg = rgPattern.test(field.value);
        if (validateRg == true) {
          return this.valid(event.target[field.name]);
        }
        return this.invalid(event.target[field.name]);
      case "password":
        if (field.value.length >= 8) {
          return this.valid(event.target[field.name]);
        }
        return this.invalid(event.target[field.name]);
      case "confirm-password":
        if (field.value.length >= 8 && field.value == this.password) {
          return this.valid(event.target[field.name]);
        }
        return this.invalid(event.target[field.name]);
      case "cep":
        const cepPattern = /(^[0-9]{5})-?([0-9]{3}$)/;
        const validateCep = cepPattern.test(field.value);
        if (validateCep == true) {
          this.valid(event.target[field.name]);
          return this.consultaCep(field.value);
        }
        return this.invalid(event.target[field.name]);
      case "number":
        if (field.value > 0) {
          return this.valid(event.target[field.name]);
        }
        return this.invalid(event.target[field.name]);

      default:
        break;
    }
  }

  consultaCep(cep) {
    console.log(cep);
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        this.address = document.querySelector("[data-address]");
        this.state = document.querySelector("[data-state]");
        this.city = document.querySelector("[data-city]");
        this.neighbo = document.querySelector("[data-address]");
        console.log(data);
      })
      .catch((error) => alert("Tente novamente mais tarde."));
  }
}
const validate = new ValidateForm();
