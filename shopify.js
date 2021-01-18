let movieName = document.getElementById("movie")
let movies = document.getElementById("movies")
let nominations = document.getElementById("nominations")
let count = 0
let listofmovies = {}

movieName.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        //event.preventDefault()
        fetch(`http://www.omdbapi.com/?apikey=db760793&t=${movieName.value}`)
            .then(response => response.json())
            .then(data => {
                movies.innerHTML = data.Title !== undefined ? `
                    <div class="row">
                        <img src="${data.Poster}" alt="movie image"
width=200 class="search-img img-fluid">
                    </div>
                    <div class="row m-0 p-0 pl-1">
                        <p class="lead m-0 p-0">${data.Title} (${data.Year})</p>
                    </div>
                    <div class="row m-0 p-0 pl-1">
                        <p class="lead m-0 p-0"><small>${data.Plot}</small></p>
                    </div>
                    <div class="row">
                        <button id="nominate" class="btn btn-primary"
onclick="nominateMovie('${data.Title}','${data.Year}',
'${data.Poster}')">Nominate</button>
                    </div>
                `
                    : `No results found for '${movieName.value}'`
            });
    }

})


function nominateMovie(title, year, poster) {
    if (count >= 5) alert("You cannot nominate more than 5 movies")

    else {
        if (listofmovies[title]) {
            alert("You have already nominated this movie!")
        }
        else {
            listofmovies[title] = year
            count += 1;
            nominations.innerHTML += `
                <div id="movie_${count}">
                    <div class="row m-0 p-0" >
                        <div class="col-3">
                            <img src="${poster}" alt="movie image"
class="img-fluid">
                        </div>
                        <div class="col-7">
                            <p class="lead m-0 p-0">
                                <small>${title} (${year})</small>
                            </p>
                        </div>
                        <div class="col-2">
                            <button type="button" class="close"
onclick="{deleteNominee('movie_${count}', '${title}')}"
aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    <hr>
                </div>
            `
        }
    }
}


function deleteNominee(movieListID, movieTitle) {
    count--;
    delete listofmovies[movieTitle];
    let movieToRemove = document.getElementById(`${movieListID}`)
    movieToRemove.parentNode.removeChild(movieToRemove);
}