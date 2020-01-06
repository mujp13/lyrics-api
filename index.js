'use strict';

const searchURL = 'https://api.lyrics.ovh/v1/';

function getLyrics(artist, title) {

  const url = searchURL + artist + '/' + title;

  return fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results').empty();

  $('#results').append(
    `<p>${responseJson.lyrics}</p>`
  );

  $('#results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(function(event) {
    event.preventDefault();  
    const artistName = $('.js-query-artist').val();
    const songTitle = $('.js-query-title').val();
    getLyrics(artistName, songTitle)
    .then(function(lyrics) {
      displayResults(lyrics);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
}

$(watchForm);

