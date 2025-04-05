const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll("img").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      movieLists[i].style.transform = `translateX(${
        movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
      }px)`;
    } else {
      movieLists[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });

  console.log(Math.floor(window.innerWidth / 270));
});

//TOGGLE

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.toggle,.dropdown a,.movie-list-item h4"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});

function goToDetails(movieId) {
  window.location.href = `details.html?id=${movieId}`;
}

function goToGenre(genre) {
  window.location.href = `genre.html?genre=${genre}`;
}




    let movies = [];

    function loadMovies() {
        fetch('movies.csv')
            .then(response => response.text())
            .then(csvText => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: function(results) {
                        movies = results.data;
                        assignRandomMovies();
                    }
                });
            })
            .catch(error => console.error('Error loading CSV:', error));
    }

    function assignRandomMovies() {
        let usedIndexes = new Set();

        for (let i = 1; i <= 3; i++) { // Assuming 3 movie sections
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * movies.length);
            } while (usedIndexes.has(randomIndex)); // Ensure unique selection
            usedIndexes.add(randomIndex);

            let movie = movies[randomIndex];
            
            document.getElementById(`movie-poster-${i}`).src = `img/${movie.poster}`;
            document.getElementById(`movie-title-${i}`).textContent = movie.name;
            document.getElementById(`movie-rating-${i}`).textContent = `Rating: ${movie.rating}`;
            document.getElementById(`movie-genre-${i}`).textContent = `Genre: ${movie.genre1}, ${movie.genre2}`;
            document.getElementById(`movie-description-${i}`).textContent = movie.description;
        }
    }

    loadMovies();
