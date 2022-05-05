var mongoose=require('mongoose');
var db = require('./database');

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
            uri: String,
            fav:{
                type: Boolean,
                default: false
            }
        });
        
        var favoriteSchema = new mongoose.Schema({
            id : {
                type: String,
                required: true,
                unique: true
            }

        });
        
albumTable=mongoose.model('album',albumSchema);
favoriteTable= mongoose.model('favorite',favoriteSchema);
        
module.exports={
    albumTable,
    favoriteTable

   
}