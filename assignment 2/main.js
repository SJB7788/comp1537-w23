const button = document.getElementById('btn-container')
console.log(button)

let buttonVal = 1

button.addEventListener('click', (event) => {
    let buttonNth = document.getElementById(`btn${buttonVal}`)
    buttonNth.style.backgroundColor = 'beige'

    buttonVal = event.target.innerHTML;
    buttonNth = document.getElementById(`btn${buttonVal}`)
    buttonNth.style.backgroundColor = 'green'
    page_to_movie = [[0, 2], [2, 4], [4, 6], [6, 8], [8, 10], [10, 12], [12, 14], [14, 16], [16, 18], [18, 20]]
    $(document).ready(() => {
        $.ajax({
            url: "https://yts.mx/api/v2/list_movies.json?sort_by=rating",
            success: (res) => {
                const movieContainer = document.querySelector('#container')
                while (movieContainer.hasChildNodes()) {
                    movieContainer.removeChild(movieContainer.firstChild)
                }
                two_movies = res.data.movies.slice(page_to_movie[buttonVal - 1][0], page_to_movie[buttonVal - 1][1])
                two_movies.forEach((movie) => {
                    $("#container").append(
                        `<div class="movie">
                            <img src="${movie.medium_cover_image}" alt="${movie.title}">
                        </div>`
                    );
                });
            }
        });
    });
    console.log(buttonVal)
    return buttonVal
});

window.addEventListener('load', () => {
    $(document).ready(() => {
        $.ajax({
            url: "https://yts.mx/api/v2/list_movies.json?sort_by=rating",
            success: (res) => {
                two_movies = res.data.movies.slice(0, 2)
                two_movies.forEach((movie) => {
                    $("#container").append(
                        `<div class="movie">
                            <img src="${movie.medium_cover_image}" alt="${movie.title}">
                        </div>`
                    );
                });
            }
        });
    });
})

