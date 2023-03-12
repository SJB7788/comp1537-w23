const button = document.querySelectorAll('button')
console.log(button)

let numberMovie = 0

function movieAPI() {
    $(document).ready(() => {
        $.ajax({
            url: "https://yts.mx/api/v2/list_movies.json?sort_by=rating",
            success: (res) => {
                const movieContainer = document.querySelector('#container')
                while (movieContainer.hasChildNodes()) {
                    movieContainer.removeChild(movieContainer.firstChild)
                }
                two_movies = res.data.movies.slice(page_to_movie[numberMovie - 1][0], page_to_movie[numberMovie - 1][1])
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
}


button.forEach((elem) => {
    elem.addEventListener('click', (event) => {
        numberVal = event.target.innerHTML
        console.log(numberVal);
        let prevBtn = document.querySelector('#btnprev')
        let nextBtn = document.querySelector('#btnnext')
        if (numberVal == 1) {
            prevBtn.classList.add('gray')
            nextBtn.classList.remove('gray')
        } else if (numberVal == 10) {
            nextBtn.classList.add('gray')
            prevBtn.classList.remove('gray')
        } else {
            nextBtn.classList.remove('gray')
            prevBtn.classList.remove('gray')
        }
        page_to_movie = [[0, 2], [2, 4], [4, 6], [6, 8], [8, 10], [10, 12], [12, 14], [14, 16], [16, 18], [18, 20]]
        if (elem.id == "btnprev" || elem.id == "btnnext") {
            if (elem.id == "btnprev" && numberMovie > 1) {
                let buttonNth = document.getElementById(`${numberMovie}`)
                buttonNth.style.backgroundColor = 'beige'
                numberMovie = Number(numberMovie) - 1;
            } if (elem.id == "btnnext" && numberMovie < 10) {
                let buttonNth = document.getElementById(`${numberMovie}`)
                buttonNth.style.backgroundColor = 'beige'
                numberMovie = Number(numberMovie) + 1
                console.log(numberMovie)
            }
            buttonNth = document.getElementById(`${numberMovie}`)
            buttonNth.style.backgroundColor = 'green'
            movieAPI()
            return numberMovie
        } else {
        let buttonNth = document.getElementById(`${numberMovie}`)
        buttonNth.style.backgroundColor = 'beige'
        numberMovie = event.target.innerHTML;
        buttonNth = document.getElementById(`${numberMovie}`)
        buttonNth.style.backgroundColor = 'green'
        movieAPI()
        return numberMovie
        }
        
    });
})

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
        numberMovie = 1
        let buttonNth = document.getElementById(`${numberMovie}`)
        buttonNth.style.backgroundColor = 'green'
        let prevBtn = document.querySelector('#btnprev')
        prevBtn.classList.add('gray')
        return numberMovie
    });
})

