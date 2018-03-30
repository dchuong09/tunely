var mongoose = require('mongoose');
  Schema = mongoose.Schema;
Song = require('./song.js');

var AlbumSchema = new Schema({
	artistName: String,
    name: String,
    releaseDate: String,
    genres: [ String ],
    songs: [Song.schema]
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;