/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */
 

$(document).ready(function() {
  console.log('app.js loaded!');

  // make a get request for all albums
  $.ajax({
    method: 'GET',
    url: 'api/albums',
    success: handleSuccess,
    error: handleError
  });

  $('#album-form form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: 'api/albums',
      data: $(this).serialize(),
      success: handleSuccess,
      error: handleError
    });
    // reset form input values after formData has been captured
    $(this).trigger("reset");
  });


  $('#albums').on('click', '.add-song', function(e) {
    console.log('add-song clicked!');
    var id = $(this).closest('.album').data('album-id');

    $('#songModal').data('album-id', id);
    $('#songModal').val();

     $('#saveSong').on('click', handleNewSongSubmit);
  });

});

function handleNewSongSubmit(e) {
  e.preventDefault();
  console.log('in handleNewSongSubmit function');

  var $modal = $('#songModal');
  var $songNameField = $modal.find('#songName');
  var $trackNumberField = $modal.find('#trackNumber');

  var albumId = $modal.data('albumId');

  // get data from modal fields
  // note the server expects the keys to be 'name', 'trackNumber' so we use those.
  var postData = {
    name: $songNameField.val(),
    trackNumber: $trackNumberField.val()
  };

  // POST to SERVER
  var songPostUrl = '/api/albums/'+ albumId + '/songs';
  $.post(songPostUrl, postData, function(data) {
    $modal.modal('hide');

    $songNameField.val('');
    $trackNumberField.val('');

    var albumGetUrl = '/api/albums/' + albumId;
    $.get(albumGetUrl, function(updatedAlbum) {
      // remove current instance of album
      $('[data-album-id=' + albumId + ']').remove();
      
      // re-render album with new songs
      renderAlbum(updatedAlbum);
    });
  }).fail(function(xhr, status, err) {
    console.log('post to /api/albums/:albumId/songs resulted in error', err);
  });
  // get data from modal fields
  // get album ID
  // POST to SERVER
  // clear form
  // close modal
  // update the correct album to show the new song
}

function handleError (err) {
  console.log('There has been an error: ', err);
};

function handleSuccess (albums) {
  albums.forEach(function(album) {
    renderAlbum(album);
  })
};


// this function takes a single album and renders it to the page
function renderAlbum(album) {
  var albumSong = album.songs.map(function(song){
    return ` - (${ song.trackNumber }) - ${ song.name }`
  })

  var albumStr = albumSong.join('');

  var albumHtml =  `
            <!-- one album -->
          <div class="row album" data-album-id="${album._id}">

            <div class="col-md-10 col-md-offset-1">
              <div class="panel panel-default">
                <div class="panel-body">

                <!-- begin album internal row -->
                  <div class='row'>
                    <div class="col-md-3 col-xs-12 thumbnail album-art">
                      <img src="../public/images/800x800.png" alt="album image">
                    </div>

                    <div class="col-md-9 col-xs-12">
                      <ul class="list-group">
                        <li class="list-group-item">
                          <h4 class='inline-header'>Album Name:</h4>
                          <span class='album-name'>${album.name}</span>
                        </li>

                        <li class="list-group-item">
                          <h4 class='inline-header'>Artist Name:</h4>
                          <span class='artist-name'>${album.artistName}</span>
                        </li>

                        <li class="list-group-item">
                          <h4 class='inline-header'>Released date:</h4>
                          <span class='album-releaseDate'>${album.releaseDate}</span>
                        </li>

                        <li class="list-group-item">
                          <h4 class="inline-header">Songs:</h4>
                          <span>${albumStr}</span>
                        </li>
                      </ul>
                    </div>

                  </div>
                  <!-- end of album internal row -->

                  <div class='panel-footer'>
                    <div class='panel-footer'>
                      <button class='btn btn-primary add-song'>Add Song</button>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>
          <!-- end one album -->
  `
  $('#albums').append(albumHtml);
}
