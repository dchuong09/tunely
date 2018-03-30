
var db = require('../models');

// controllers/albumsController.js
// GET /api/albums
function index(req, res) {
  // send back all albums as JSON
  db.Album.find({}, function(err, allAlbums) {
    res.json(allAlbums);
  })
}

// POST /api/albums
function create(req, res) {
  // break data in the genre field into an array
  var genres = req.body.genres.split(', ');
  req.body.genres = genres;
  
  // create an album based on request body and send it back as JSON
  db.Album.create(req.body, function(err, album){
    if (err) {
      console.log('error', err); 
    } 
    res.json(album);
  })
}

// GET /api/albums/:albumId
function show(req, res) {
  // find one album by id and send it back as JSON
  db.Album.findById(req.params.albumId, function(err, foundAlbum) {
    res.json(foundAlbum);
  });
}

// DELETE /api/albums/:albumId
function destroy(req, res) {
  // find one album by id, delete it, and send it back as JSON
}

// PUT or PATCH /api/albums/:albumId
function update(req, res) {
  // find one album by id, update it based on request body,
  // and send it back as JSON
}

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};