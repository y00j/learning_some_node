const https = require('https');

let movieTitles = [];


function getMovieTitles(substr) {

  queryData(substr).then(() => {
    return movieTitles;
  });
}

const queryData = async (substr) => {
  let baseUrl = "https://jsonmock.hackerrank.com/api/movies/search/?Title=";
  let url = `${baseUrl}${substr}`;
  let totalPages;
  let movies;

  const response = await https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
      data = JSON.parse(data);

      movies = data.data;
      totalPages = data.total_pages;
      movies.forEach((movie) => {
        movieTitles.push(movie.Title);
      });

      // console.log(movieTitles);


      for (let i = 2; i <= totalPages; i++) {
        let nextUrl = `${url}&page=${i}`;
        https.get(nextUrl, (nextRes) => {
          nextRes.on('data', (nextChunk) => {
            let nextMovies = JSON.parse(nextChunk).data;
            nextMovies.forEach((movie) => {
              movieTitles.push(movie.Title);
            });
            console.log(movieTitles)
          });

        });
      }


      // getMovies().then(() => console.log(movieTitles, "new movie titles"));

    });

  });

  return response;

}



console.log(getMovieTitles("spiderman"));