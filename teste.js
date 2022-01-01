class ValidateForm {
  constructor() {
    this.form = document.querySelector(".needs-validation");
    this.inputs = document.querySelectorAll("input");

    this.inputs.forEach((input) =>
      input.addEventListener("keyup", (event) => {
        event.preventDefault();
        const inputField = event.target;
        const isValid = event.target.validity.valid;
        console.log(event.target.validationMessage);
        this.clearErrors(inputField);
        if (isValid) {
          inputField.style.borderColor = "#157951";
          inputField.classList.add("is-valid");
        } else {
          inputField.style.borderColor = "#ff0000";
          inputField.classList.add("is-invalid");
        }
      })
    );
  }

  clearErrors(field) {
    field.classList.remove("is-valid");
    field.classList.remove("is-invalid");
  }
}
const validate = new ValidateForm();

// se o nome for menor que 3 caracteres, innerText para "insira no minimo 3 caracteres"
