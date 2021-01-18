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
                movies.innerHTML = `
                <li> ${data.Title} (${data.Year})
                <button id="nominate" onclick="nominateMovie('${data.Title}','${data.Year}')">Nominate</button>
                </li>`
            });
    }

}
)


function nominateMovie(title, year) {
    if (count >= 5) alert("You cannot nominate more than 5 movies")

    else {
        if (listofmovies[title]) {
            alert("You have already nominated this movie!")
        }
        else {
            listofmovies[title] = year
            count += 1;
            nominations.innerHTML += `<li id="movie_${count}">${title} (${year})
        <button onclick={deleteNominee('movie_${count}')}>X</button>
        </li>`
        }
    }
}


function deleteNominee(movielistID) {
    count--
    let movieToRemove = document.getElementById(`${movielistID}`)
    movieToRemove.parentNode.removeChild(movieToRemove);
}

