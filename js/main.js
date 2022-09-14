var $img = document.querySelector('.journal-image');
var $title = document.querySelector('#title');
var $photoURL = document.querySelector('#img-url');
var $notes = document.querySelector('#notes');
var $form = document.querySelector('.entry-form');
var $entryList = document.querySelector('.entry-list');
var $entryTab = document.querySelector('.entries-link');
var $newEntryPage = document.querySelector('.new-entry');
var $viewTab = document.querySelectorAll('.view-tab');
var $noEntry = document.querySelector('.no-entry');
var $entryHeader = document.querySelector('.entry-header');

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
  $noEntry.className = 'no-entry hidden';
}

function createEntryTree(entry) {
  var $li = document.createElement('li');
  var $divRow = document.createElement('div');
  var $divColumn = document.createElement('div');
  var $divColumn2 = document.createElement('div');
  var $img = document.createElement('img');
  var $h4 = document.createElement('h4');
  var $pencil = document.createElement('button');
  var $p = document.createElement('p');

  $divRow.className = 'row';
  $divColumn.className = 'column-half';
  $divColumn2.className = 'column-half';
  $img.className = 'journal-image';
  $h4.className = 'journal-header';
  $pencil.className = 'fa fa-pencil pencil';
  $p.className = 'journal-text';

  $li.setAttribute('data-entry-id', entry.entryId);
  $img.setAttribute('src', entry.photoURL);
  $h4.textContent = entry.title;
  $p.textContent = entry.notes;

  $entryList.appendChild($li);
  $li.appendChild($divRow);
  $divRow.appendChild($divColumn);
  $divColumn.appendChild($img);
  $divRow.appendChild($divColumn2);
  $divColumn2.appendChild($h4);
  $h4.appendChild($pencil);
  $divColumn2.appendChild($p);

  return $li;
}

function loadData() {
  for (var j = 0; j < $viewTab.length; j++) {
    var reloadView = $viewTab[j].getAttribute('data-view');
    if (reloadView === data.view) {
      $viewTab[j].className = 'view-tab';
    } else {
      $viewTab[j].className = 'view-tab hidden';
    }
  }
  for (var i = 0; i < data.entries.length; i++) {
    var entry = createEntryTree(data.entries[i]);
    $entryList.appendChild(entry);
  }
  if (data.entries.length > 0) {
    $noEntry.className = 'no-entry hidden';
  }
}

function changeView(event) {
  var $clickId = event.target.getAttribute('id');

  for (var k = 0; k < $viewTab.length; k++) {
    $viewTab[k].className = 'view-tab hidden';
    var entryView = $viewTab[k].getAttribute('data-view');
    if ($clickId === entryView) {
      $viewTab[k].className = 'view-tab';
      data.view = entryView;
    }
  }
}

$photoURL.addEventListener('input', updatePhoto);
$form.addEventListener('submit', saveEntry);
window.addEventListener('DOMContentLoaded', loadData);
$entryTab.addEventListener('click', changeView);
$newEntryPage.addEventListener('click', changeView);
$entryList.addEventListener('click', editEntry);

function editEntry(event) {
  if (event.target.tagName === 'BUTTON') {
    for (var l = 0; l < $viewTab.length; l++) {
      var $editForm = $viewTab[l].getAttribute('data-view');
      if ($editForm === 'entry-form') {
        $viewTab[l].className = 'view-tab';
        $entryHeader.textContent = 'Edit Entry';
      } else {
        $viewTab[l].className = 'view-tab hidden';
      }
    }
  }
}

// check if any variables can be brought out of function to be reused

// function editEntry(event) {
//   }
// }

//   // maybe instead of this just rename the title of the entry form and populate
//   // the information into the form
//   var dataEntryId = event.target.closest('li').getAttribute('data-entry-id');
//   var $editPreview = document.querySelector('.edit-image');
//   var $editTitle = document.querySelector('#edit-title');
//   var $editUrl = document.querySelector('#edit-img-url');
//   var $editNotes = document.querySelector('#edit-notes');

//   for (var m = 0; m < data.entries.length; m++) {
//     // dataEntryId is a string and data.entries[m].entryId is a number
//     // need to get them to match up
//     if (data.entries[m].entryId === dataEntryId) {
//       $editPreview.setAttribute('src', data.entries[m].photoURL);
//       $editTitle.value = data.entries[m].title;
//       $editUrl.value = data.entries[m].photoURL;
//       $editNotes.value = data.entries[m].notes;
//     }
//   }

// }
