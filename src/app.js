/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

var request = require('request'); // "Request" library

var client_id = '3ce9a417f2094431888205c85f2e61a8'; // Your client id
var client_secret = '2b69ce3f0d3643d0a65f8537c490e775'; // Your secret


var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: '3ce9a417f2094431888205c85f2e61a8',
  clientSecret: '2b69ce3f0d3643d0a65f8537c490e775',
  redirectUri: 'http://www.example.com/callback'
});

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  //url: 'https://accounts.spotify.com/authorize ',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {

  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var token = body.access_token;
    spotifyApi.setAccessToken(token);

    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
      function(data) {
        console.log('Artist albums', data.body);
      },
      function(err) {
        console.error(err);
      }
    );
  
  }
});
