const https = require('https');


let numPages = 2;
let firstTime = true;

async function getMovieTitles(substr) {
  let page = 1;
  let movieTitles = [];
  while (page <= numPages) {
    let movies = await queryData(substr, page);
    movies.forEach((movie) => {
      movieTitles.push(movie.Title);
    });
    page++;

  }
  return movieTitles;
}

const queryData = (substr, pageNum) => {


  return new Promise((yes, no) => {
    let baseUrl = "https://jsonmock.hackerrank.com/api/movies/search/?Title=";
    let url = `${baseUrl}${substr}&page=${pageNum}`;

    https.get(url, (resp) => { 
      let movieData = '';


      resp.on('data', (chunk) => {  
        movieData += chunk; 
      });


      resp.on('end', () => {  
        movieData = JSON.parse(movieData);
        let movies = movieData.data;
        if (firstTime) {
          numPages = movieData.total_pages;
          firstTime = false;
        }

        yes(movies);
      });
    });
  });

};




getMovieTitles("spiderman")
  .then((m) => {
    movieTitles2 = m;
    console.log(movieTitles2, movieTitles2.length);
  });