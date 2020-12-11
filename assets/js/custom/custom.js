/* Create Your Javascript Code */

let moviesContent = document.querySelector('#movies');


 $(document).ready(() => {
    $('form').on('submit', (e) =>{

        let movieText = $('#movieText').val();

        try {
        
        let content = '';

        getMovies(movieText).then(movies => {

            movies.forEach(movie => {

                content += `
                
                <div class="col">
                    <img src="${movie.image.medium}" alt="${movie.name}"/>
                </div>
             
                `;
                
            });

            moviesContent.innerHTML = content; 

            console.log(movies);

        })

        } catch (error) {
            console.log(error)
        }

        e.preventDefault();
    })
}) 




let getMovies = async (movieText) => {

        try {
    
        let result = await fetch('http://api.tvmaze.com/search/shows?q=' + movieText);

        let data = await result.json();

        let movies = [...data];

        movies = data.map(movie => { // DESTRUCTRING DATA

            let {score, show} = movie;

            let {language, image , genres, name, premiered, rating, runtime, summary} = show;

            return {score, genres, image, language, name, premiered, rating, runtime, summary};

        });
        
        return movies.filter(item => {
            return item.image !== null;
        });

    }catch(error){
        console.log(error);
    }
}





