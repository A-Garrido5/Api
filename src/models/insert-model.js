var mongoose=require('mongoose');
var db = require('../database');

// create an schema
var albumSchema = new mongoose.Schema({
            album_group : String,
            album_type : String,
            artists: Array ,
            available_markets : Array ,
            external_urls: Array ,
            href : String,
            id : {
                type: String,
                required: true,
                unique: true
            },
            images: Array ,
            name : String,
            release_date: String,
            release_date_precision: String,
            total_tracks: Number,
            type: String,
            uri: String
        });

albumTable=mongoose.model('album',albumSchema);
        
module.exports={
    albumTable,
     createData: async function(inputData, callback){
                  
        albumData= await new albumTable(inputData);
        
        albumData.save(function(err, data){
          if (err) throw err;
           return callback(data);
        });
        
     },

     getData:function(){

        const Album = mongoose.model('albums', albumSchema);
          
          const all = Album.find();
        
          console.log(all);

        
        //console.log(movies);


     }
}