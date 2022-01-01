class Recover {
  constructor() {
    this.content = document.querySelector("[data-main-content]");
    this.recoveryButton = document.querySelector("[data-recovery-button]");

    this.recoveryButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.input = document.querySelector(".input");
      this.recoveryPassword(this.input.value);
    });
  }

  recoveryPassword(email) {
    this.content.innerHTML = `<p class="text-white secondary-option">
      Enviamos um link de recuperação para seu e-mail <span class="fw-bold">${email}</span></p>
    <button
      class="
        btn
        action-button
        border-15
        mt-3
        align-self-center
        justify-self-center
      "
      type="submit"
      data-login-button
      name="signin-button"
    >
      Fazer login
    </button>
    <p class="secondary-option mt-3">
      <a class="text-white border-bottom border-warning" href=""
        >Não recebi o e-mail</a
      >
    </p>`;
  }
}

const recovery = new Recover();
