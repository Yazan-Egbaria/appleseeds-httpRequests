class Movie {
  constructor(title, releaseDate, picture, rating) {
    this.title = title;
    this.releaseDate = releaseDate;
    this.picture = picture;
    this.rating = rating;
  }

  getTitle() {
    return this.title;
  }

  getReleaseDate() {
    return new Date(this.releaseDate).toLocaleDateString();
  }

  getPicture() {
    return this.picture;
  }

  getRating() {
    return this.rating;
  }
}

const getHttpOptions = () => ({
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTRlMDIyMjU0MTgwNzViNjRjMTg2NjA4NjhjMDFlMiIsIm5iZiI6MTcyOTA4MzA0My43Mjk2NjcsInN1YiI6IjY3MGJiMjJlNDExMWJlNGYwMjc0OWU0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sJC3kBewGf-0NlT0jVFDSYPjNDgNfzhbrAE4a_9G4xE",
  },
});

const API_BASE_URL = "https://api.themoviedb.org/3/";

const getImage = (imgPath) => {
  return `https://image.tmdb.org/t/p/original/${imgPath}`;
};

const fetchMovies = () => {
  fetch(`${API_BASE_URL}movie/popular?language=en-US&page=1`, getHttpOptions())
    .then((res) => res.json())
    .then((data) => {
      data.results.forEach((result) => {
        const title = result.title;
        const releaseDate = result.release_date;
        const picture = getImage(result.poster_path || result.backdrop_path);
        const rating = result.vote_average;
        const movie = new Movie(title, releaseDate, picture, rating);
        createMovieCard(movie);
      });
      updateItemCount(data.results.length);
    })
    .catch((err) => {
      console.log(err);
    });
};

function updateItemCount() {
  const p = document.querySelector(".sort-bar p");
  const movies = document.querySelectorAll(".movie");
  const moviesCount = movies.length;
  p.innerHTML = `${moviesCount} movies`;
}

function createMovieCard(movie) {
  let target = document.querySelector(".movies-list");
  target.innerHTML += `<div class="movie">
  <img class="vector-img" src="./images/Vector.svg" />
  <a href="#">
    <img class="poster-img" src="./images/tabler-icon-plus.svg" />
  </a>
  <img class="poster" src="${movie.getPicture()}" />
  <div class="flex-container movie-info">
    <a href="#" class="title normal-link">${movie.getTitle()}</a>
    <p class="release-date"><strong>Release Date:</strong>${movie.getReleaseDate()}</p>
    <div class="flex-container rate-trailer">
      <div class="flex-container trailer">
        <img src="./images/play.svg" />
        <a href="#">Trailer</a>
      </div>
      <div class="flex-container rating">
        <img src="./images/star.svg" />
        <p>${movie.getRating()}</p>
      </div>
    </div>
  </div>
</div>
`;
}

fetchMovies();
