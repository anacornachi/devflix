class Modal {
  constructor() {
    this.modal = document.querySelector("[data-modal]");
  }

  open() {
    this.modal.classList.add("show");
    this.modal.style.display = "block";
  }

  close() {
    this.modal.classList.remove("show");
    this.modal.style.display = "none";
  }
}
const modal = new Modal();
