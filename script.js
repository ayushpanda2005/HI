const API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=6ebb3f1a04ab65abc1642edabed3abd4' 
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280' 
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?query="'
const keyu ='&api_key=6ebb3f1a04ab65abc1642edabed3abd4'

const form = document.getElementById('form') 
const search = document.getElementById('search') 

getMovies(API_URL) 
async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json() 

    showMovies(data.results)
}

function showMovies(movies) {
    const main = document.querySelector('main'); // Assuming 'main' is defined elsewhere in your script
    main.innerHTML = '';

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3> <!-- Fixed from 'Movie Title' to the dynamic title -->
                <span class="${rate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);
    });
}


function rate(pin){
    if(pin >= 8){
         return 'green'
    }
    else if( pin >= 5){
         return 'orange'
    }
    else return 'red'
}
form.addEventListener('submit' , (e) =>{
    e.preventDefault()

    const searchterm = search.value 

    if( searchterm && searchterm!==''){
        getMovies(SEARCH_API + searchterm + keyu)

        search.value = ''
    }
    else{
        window.location.reload()
    }
})
