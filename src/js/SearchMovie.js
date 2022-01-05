class SearchMovie {
  constructor() {
    this.searchButton = document.querySelector("[data-search-button]");
    this.modal = new Modal();

    this.searchButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.movieTitle = document.querySelector("[data-movie-title]").value;

      this.searchMovie(this.movieTitle);
    });
  }

  searchMovie(movieName) {
    console.log(movieName);

    fetch(`http://www.omdbapi.com/?t=${movieName}&apikey=10109cdf`)
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
    console.log(movie);
  }
}

const search = new SearchMovie();
