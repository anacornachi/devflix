class Recover {
  constructor() {
    this.content = document.querySelector("[data-main-content]");
    this.recoveryButton = document.querySelector("[data-recovery-button]");

    this.recoveryButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.input = document.querySelector(".input");
      this.recoveryPassword(this.input.value);
    });
  }

  recoveryPassword(email) {
    this.content.innerHTML = `<p class="text-white secondary-text">
      Enviamos um link de recuperação para seu e-mail <span class="fw-bold">${email}</span></p>
      <a href="/src/pages/login.html">
        <button
          class="
            btn
            action-button
            border-15
            mt-3
            align-self-center
            justify-self-center
          "
          data-login-button
          name="signin-button"
          onclick="recovery.preventForm(event)"
        >
          Fazer login
        </button>
    </a>
    <p class="secondary-text mt-3">
      <a class="text-white border-bottom border-warning" href=""
        >Não recebi o e-mail</a
      >
    </p>`;
  }

  preventForm(event) {
    event.preventDefault();
    window.location.href = "../pages/login.html";
  }
}

const recovery = new Recover();
