let movieName = document.getElementById("movie")

movieName.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        //event.preventDefault()
        console.log(movieName.value)
        fetch(`http://www.omdbapi.com/?apikey=db760793&t=${movieName.value}`)
            .then(response => response.json())
            .then(data => console.log(data));
    }
}
) 