$(document).ready(() => {
    $.ajax({
        url: "https://yts.mx/api/v2/list_movies.json?sort_by=date_added",
        success: (res) => {
            eight_movies = res.data.movies.slice(0, 8);

            eight_movies.forEach((movie) => {
                $("#movie-container").append(
                    `<div class="movie">
                        <img src="${movie.medium_cover_image}" alt="${movie.title}">
                        <h3>${movie.title}</h3>
                        <p>${movie.year}</p>
                    </div>`
                );
            });
        }
    });
});

// Using Fetch 

// const movieContainer = document.querySelector("#movie-container")
// console.log(movieContainer)

// fetch("https://yts.mx/api/v2/list_movies.json?sort_by=date_added")
//     .then((response) => response.json())
//     .then((res) => {
//         console.log(res.data.movies)
//         eight_movies = res.data.movies.slice(0, 8)

//         fullMovieContent =""
//         eight_movies.forEach((movie) => {
//             let movieContent = 
//             `<div class="movie">
//                 <img src="${movie.medium_cover_image}" alt="${movie.title}">
//                 <h3>${movie.title}</h3>
//                 <p>${movie.year}</p>
//             </div>`
//             fullMovieContent += movieContent
//         })
//         movieContainer.innerHTML = fullMovieContent
//     })