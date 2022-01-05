class SearchMovie {
  constructor() {
    this.searchButton = document.querySelector("[data-search-button]");
    this.content = document.querySelector("[data-main-content]");
    this.modal = new Modal();

    this.searchButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.movieTitle = document.querySelector("[data-movie-title]").value;

      this.searchMovie(this.movieTitle);
    });
  }

  searchMovie(movieName) {
    fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=10109cdf`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response == "False") {
          this.modal.open();
          throw new Error("Não encontramos nada parecido");
        } else {
          this.renderPage(data);
        }
      })
      .catch((error) => console.log(error));
  }

  renderPage(movie) {
    this.content.innerHTML = `<div class="container py-3 p-md-4 border-15 background">
    <figure
      class="row d-flex justify-content-center justify-content-md-end align-items-start m-0"
    >
      <button type="submit" class="btn btn-default" onclick="search.close()">
        <i class="bi bi-x-circle" style="font-size: 2rem; color: white"></i>
      </button>
    </figure>
    <div class="row d-flex flex-column flex-md-row py-2">
      <figure class="col-12 col-md-6 col-xl-4">
        <img
          src="${movie.Poster}"
          class="w-100 movie-poster"
          alt=""
        />
      </figure>
      <div
        class="col-12 col-md-6 col-xl-8 d-flex flex-column gap-5 align-items-start"
      >
        <div
          class="col-12 d-flex flex-column align-items-center gap-2 align-items-md-start"
        >
          <h2 class="fw-bold text-white m-0 mt-2 mt-md-0">
            ${movie.Title}
          </h2>
          <div class="d-flex align-items-center">
            <p class="text-white m-0 p-0">${movie.Year}</p>
            <i
              class="bi bi-circle-fill mx-3"
              style="font-size: 0.5rem; color: white"
            ></i>
            <p class="text-white m-0 p-0">${movie.Runtime}</p>
          </div>
          <p class="text-warning text-start m-0 p-0">
            <i class="bi bi-star-fill stars me-2"></i>3.5
          </p>
        </div>
        <p class="col-12 text-white text-center text-md-start">
        ${movie.Plot}
        </p>
        <div
          class="d-flex flex-column align-items-start gap-2 mt-xl-3 col-12"
        >
          <h6 class="text-secondary">Elenco:</h6>
          <p class="text-white ms-5">${movie.Actors}</p>
          <h6 class="text-secondary">Direção:</h6>
          <p class="text-white ms-5">${movie.Director}</p>
        </div>
        <button
          class="align-self-center btn-cta py-3 px-5 border-15 fw-bold"
        >
          Assistir agora
        </button>
      </div>
    </div>
  </div>`;
  }

  close() {
    window.location.reload();
  }
}

const search = new SearchMovie();
