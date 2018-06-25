const https = require('https');

let movieTitles = [];
let numPages = 1;
let firstTime = true;

async function getMovieTitles(substr) {
  let page = 1;
  while (numPages > 0) {
    await queryData(substr, page);
    console.log('queryData finished for page = ' + page + ' numPages =' + numPages);
    //also update numPages after first request : TODO
    page++;
    numPages--;
    console.log("after decrementing numPages", numPages)
  }
  return movieTitles;
}

const queryData = async (substr, pageNum) => {


  return new Promise((yes, no) => {
    let baseUrl = "https://jsonmock.hackerrank.com/api/movies/search/?Title=";
    let url = `${baseUrl}${substr}&page=${pageNum}`;

    https.get(url, (resp) => { 
      let movieData = '';

        // A chunk of data has been recieved. 
      resp.on('data', (chunk) => {  
        movieData += chunk; 
      });

        // The whole response has been received. Print out the result. 
      resp.on('end', () => {  
        movieData = JSON.parse(movieData);
        let movies = movieData.data;
        if (firstTime) {
          numPages = movieData.total_pages;
          console.log("firstTime", numPages);
          firstTime = false;
        }
        movies.forEach((movie) => {
          console.log(movie.Title);
          movieTitles.push(movie.Title);
        });
        yes();
      });
    });
  });

};



// https.get(url, (res) => {
//   let data = '';
//   res.on('data', (chunk) => {
//     data += chunk;
//     data = JSON.parse(data);

//     movies = data.data;
//     totalPages = data.total_pages;
//     movies.forEach((movie) => {
//       movieTitles.push(movie.Title);
//     });

//     // console.log(movieTitles);


//     for (let i = 2; i <= totalPages; i++) {
//       let nextUrl = `${url}&page=${i}`;
//       https.get(nextUrl, (nextRes) => {
//         nextRes.on('data', (nextChunk) => {
//           let nextMovies = JSON.parse(nextChunk).data;
//           nextMovies.forEach((movie) => {
//             movieTitles.push(movie.Title);
//           });
//           console.log(movieTitles, "this is loggin")
//         });

//       });
//     }


//     // getMovies().then(() => console.log(movieTitles, "new movie titles"));

//   });

// });


(async function () {
  var movieTitles2;

  getMovieTitles("man")
    .then((m) => {
      movieTitles2 = m;
      console.log(movieTitles2, movieTitles.length);
    });
})();