var $img = document.querySelector('.journal-image');
var $title = document.querySelector('#title');
var $photoURL = document.querySelector('#img-url');
var $notes = document.querySelector('#notes');
var $form = document.querySelector('.entry-form');
var $entryList = document.querySelector('.entry-list');

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

  var addEntry = createEntryTree(newEntry);
  $entryList.prepend(addEntry);
}

function createEntryTree(entry) {
  var $li = document.createElement('li');
  var $divRow = document.createElement('div');
  var $divColumn = document.createElement('div');
  var $divColumn2 = document.createElement('div');
  var $img = document.createElement('img');
  var $h4 = document.createElement('h4');
  var $p = document.createElement('p');

  $divRow.className = 'row';
  $divColumn.className = 'column-half';
  $divColumn2.className = 'column-half';
  $img.className = 'journal-image';
  $h4.className = 'journal-header';
  $p.className = 'journal-text';

  $img.setAttribute('src', entry.photoURL);
  $h4.textContent = entry.title;
  $p.textContent = entry.notes;

  $entryList.appendChild($li);
  $li.appendChild($divRow);
  $divRow.appendChild($divColumn);
  $divColumn.appendChild($img);
  $divRow.appendChild($divColumn2);
  $divColumn2.appendChild($h4);
  $divColumn2.appendChild($p);

  return $li;
}

function loadData() {
  for (var i = 0; i < data.entries.length; i++) {
    var entry = createEntryTree(data.entries[i]);
    $entryList.appendChild(entry);
  }
}

$photoURL.addEventListener('input', updatePhoto);
$form.addEventListener('submit', saveEntry);
window.addEventListener('DOMContentLoaded', loadData);
