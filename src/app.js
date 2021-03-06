/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

var request = require('request'); // "Request" library
const express = require('express');
const app = express();
const morgan=require('morgan');
var mongoose=require('mongoose');

const cors = require('cors');
app.use(cors());
app.options('*', cors());

var Model= require('./model');

var client_id = '3ce9a417f2094431888205c85f2e61a8'; // Your client id
var client_secret = '2b69ce3f0d3643d0a65f8537c490e775'; // Your secret


var SpotifyWebApi = require('spotify-web-api-node');

//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)
 
//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

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

var token;

//Iniciando el servidor
app.listen(app.get('port'),()=>{
  console.log(`Server listening on port ${app.get('port')}`);
});

request.post(authOptions, function(error, response, body) {

  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    token = body.access_token;
    spotifyApi.setAccessToken(token);

    
   

 
    /*
    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
      function(data) {
        
        data.body.items.forEach(function(element) 
        {          

          albumData= new albumTable(element);
        
          albumData.save(function(err, data){
              if (err) throw err;
              
          });


        });
        
      },
      function(err) {
        console.error(err);
      }
    );*/
  
  }
});


app.get('/getAllAlbums', (req, res) => {
  
  var Album = Model.albumTable;

  Album.find().then((result)=>{
		res.send(result);
	}).catch((err) =>{
		console.log(err);
	})
  

})

app.get('/getAllFavorites', (req, res) => {
  
  var Favorites = Model.favoriteTable;

  Favorites.find().then((result)=>{
		res.send(result);
	}).catch((err) =>{
		console.log(err);
	})
  

})

app.post('/updateAlbum', (req, res) => {
  
  var Album = Model.albumTable;

  Album.update({ id: req.body.id }, req.body, (err, doc) => {
    console.log(doc)
    res.send(doc)
    
  });
  

})

app.post('/addToFavorites', (req, res) => {
  
  albumData= new favoriteTable(req.body);
        
    albumData.save(function(err, data){
        console.error(err);
        res.send(data)
        
    });

})

app.post('/removeFromFavorites', (req, res) => {
  
  var Album = Model.favoriteTable;
        
  Album.deleteOne({ id: req.body.id }, req.body, (err, doc) => {
    
    res.send(doc)
    
  });

})



app.get('/search', async (req, res) => {
  var respuesta = [];
  var Album = Model.albumTable;

  var options = {
    url: 'https://api.spotify.com/v1/search?type=album&include_external=audio&q='+req.query.q,
    headers: {
      'Authorization': 'Bearer ' + token
    },
    json: true
  };
  request.get(options, async (error, response, body) => {

    
    const respuesta = await Promise.all(
     body.albums.items.map(async(element) => {
      

      const exe = await Album.find({id: element.id}).then(async (result)=>{
        if(result.length==0){
        
          albumData= new albumTable(element);
        
          return await albumData.save( async (data) =>{
            
            element.fav = false;
            return element;
                      
              
          });
        }
        else{
          
          element.fav = result[0].fav;
          return element;

          
        }


      });
      
      return exe;
    }));
    
    console.log(respuesta)
    res.send(respuesta)

   
    
    
  });


  

})