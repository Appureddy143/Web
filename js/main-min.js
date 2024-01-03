function getMovies(input) {
  // Check if the input is a file path
  if (isFilePath(input)) {
    // Read the local file
    readLocalFile(input);
  } else {
    console.error("Invalid file path");
  }
}

function isFilePath(input) {
  // You can implement your logic to check if the input is a file path
  // For simplicity, let's assume that any input containing "file://" is a file path
  return input.startsWith("list.html");
}

function readLocalFile(filePath) {
  // Extract file name from the path
  let fileName = filePath.split("list.html").pop();

  // Read the file content
  $.get(filePath, (data) => {
    // Process the file content (you might need to adjust this based on your file format)
    let movieData = parseFileContent(data);

    // Display the movie information
    displayLocalMovie(fileName, movieData);
  });
}

function parseFileContent(fileContent) {
  // Implement your logic to parse the file content and extract movie information
  // For example, if the file contains JSON data, you can parse it using JSON.parse
  // Adjust this based on your file format
  try {
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error parsing file content:", error);
    return null;
  }
}

function displayLocalMovie(fileName, movieData) {
  // Display the movie information on the page
  if (movieData) {
    let html = `
      <div class="row">
        <div class="col-md-4">
          <img src="${movieData.Poster}" class="thumbnail">
        </div>
        <div class="col-md-8">
          <h2>${movieData.Title}</h2>
          <ul class="list-group">
            <li class="list-group-item"><strong>Genre:</strong>${movieData.Genre}</li>
            <li class="list-group-item"><strong>Released:</strong>${movieData.Released}</li>
            <li class="list-group-item"><strong>Rated:</strong>${movieData.Rated}</li>
            <li class="list-group-item"><strong>ImdbRating:</strong>${movieData.imdbRating}</li>
            <li class="list-group-item"><strong>Director:</strong>${movieData.Director}</li>
            <li class="list-group-item"><strong>Writer:</strong>${movieData.Writer}</li>
            <li class="list-group-item"><strong>Actors:</strong>${movieData.Actors}</li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="well">
          <h3>Plot</h3>
          ${movieData.Plot}
          <hr>
          <a href="http://imdb.com/title/${movieData.imdbID}" target="_blank" class="btn bg-danger">View IMDB</a>
          <a href="index.html" class="btn btn-danger">Go Back To Search</a>
        </div>
      </div>`;
    $("#movie").html(html);
  } else {
    console.error("Invalid movie data");
  }
}
