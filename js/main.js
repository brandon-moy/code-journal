var $img = document.querySelector('.journal-image');
var $title = document.querySelector('#title');
var $photoURL = document.querySelector('#img-url');
var $notes = document.querySelector('#notes');
var $form = document.querySelector('.entry-form');
// var $entryList = document.querySelector('.entry-list');

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

// function createEntryTree(object) {
//   var $li = document.createElement('li');
//   var $divRow = document.createElement('div');
//   var $divColumn = document.createElement('div');
//   $divRow.className = 'row';
//   $divColumn.className = 'column-half';
//   var $img = document.createElement('img');
//   $img.className = 'journal-image';
//   var $h4 = document.createElement('h4');
//   $h4.className = 'journal-header';
//   var $p = document.createElement('p');
//   $p.className = 'journal-text';
//   $entryList.appendChild($li);
//   $li.appendChild($divRow);
//   $divRow.appendChild($divColumn);
//   $divColumn.appendChild($img);
// }

$photoURL.addEventListener('input', updatePhoto);
$form.addEventListener('submit', saveEntry);
