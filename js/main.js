var $img = document.querySelector('.journal-image');
var $title = document.querySelector('#title');
var $photoURL = document.querySelector('#img-url');
var $notes = document.querySelector('#notes');
var $form = document.querySelector('.entry-form');

function updatePhoto(event) {
  $img.setAttribute('src', $photoURL.value);
}

function saveEntry(event) {
  event.preventDefault();
  var newEntry = {};
  newEntry.title = $title.value;
  newEntry.photoURL = $photoURL.value;
  newEntry.notes = $notes.value;
  newEntry.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  $img.setAttribute('src', '../images/placeholder-image-square.jpg');
  $form.reset();
}

$photoURL.addEventListener('input', updatePhoto);
$form.addEventListener('submit', saveEntry);
