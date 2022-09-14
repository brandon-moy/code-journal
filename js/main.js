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
var $delete = document.querySelector('.delete');
var $deleteModal = document.querySelector('.modal-background');
var $cancel = document.querySelector('.cancel');
var $confirm = document.querySelector('.confirm');

function updatePhoto(event) {
  $img.setAttribute('src', $photoURL.value);
}

function saveEntry(event) {
  event.preventDefault();
  if (data.editing === null) {
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
  } else {
    data.editing.title = $title.value;
    data.editing.photoURL = $photoURL.value;
    data.editing.notes = $notes.value;
    var editEntry = createEntryTree(data.editing);
    var $lis = document.querySelectorAll('li');
    for (var o = 0; o < $lis.length; o++) {
      var $lisId = Number($lis[o].getAttribute('data-entry-id'));
      if ($lisId === data.editing.entryId) {
        $lis[o].replaceWith(editEntry);
      }
    }
    data.editing = null;
    $delete.className = 'hidden delete';
    for (var p = 0; p < $viewTab.length; p++) {
      var viewCheck = $viewTab[p].getAttribute('data-view');
      if (viewCheck === 'entries') {
        $viewTab[p].className = 'view-tab';
      } else {
        $viewTab[p].className = 'view-tab hidden';
      }
    }
  }
}

function createEntryTree(entry) {
  var $li = document.createElement('li');
  var $divRow = document.createElement('div');
  var $divColumn = document.createElement('div');
  var $divColumn2 = document.createElement('div');
  var $newImg = document.createElement('img');
  var $h4 = document.createElement('h4');
  var $pencil = document.createElement('i');
  var $p = document.createElement('p');

  $divRow.className = 'row';
  $divColumn.className = 'column-half';
  $divColumn2.className = 'column-half';
  $newImg.className = 'journal-image';
  $h4.className = 'journal-header';
  $pencil.className = 'fa fa-pencil pencil';
  $p.className = 'journal-text';

  $li.setAttribute('data-entry-id', entry.entryId);
  $newImg.setAttribute('src', entry.photoURL);
  $h4.textContent = entry.title;
  $p.textContent = entry.notes;

  $entryList.appendChild($li);
  $li.appendChild($divRow);
  $divRow.appendChild($divColumn);
  $divColumn.appendChild($newImg);
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
  $delete.className = 'hidden delete';
  $form.reset();
  $img.setAttribute('src', '../images/placeholder-image-square.jpg');
  $entryHeader.textContent = 'New Entry';

  for (var k = 0; k < $viewTab.length; k++) {
    $viewTab[k].className = 'view-tab hidden';
    var entryView = $viewTab[k].getAttribute('data-view');
    if ($clickId === entryView) {
      $viewTab[k].className = 'view-tab';
      data.view = entryView;
    }
  }
}

function editEntry(event) {
  if (event.target.tagName === 'I') {
    for (var l = 0; l < $viewTab.length; l++) {
      var $editForm = $viewTab[l].getAttribute('data-view');
      if ($editForm === 'entry-form') {
        $viewTab[l].className = 'view-tab';
        $entryHeader.textContent = 'Edit Entry';
        var dataEntryId = Number(event.target.closest('li').getAttribute('data-entry-id'));
        for (var m = 0; m < data.entries.length; m++) {
          if (data.entries[m].entryId === dataEntryId) {
            data.editing = data.entries[m];
          }
        }
        $title.value = data.editing.title;
        $photoURL.value = data.editing.photoURL;
        $img.setAttribute('src', data.editing.photoURL);
        $notes.value = data.editing.notes;
        $delete.className = 'delete';
      } else {
        $viewTab[l].className = 'view-tab hidden';
      }
    }
  }
}

function deleteCheck(event) {
  $deleteModal.className = 'modal-background';
}

function cancelDelete(event) {
  $deleteModal.className = 'modal-background hidden';
}

function confirmDelete(event) {
  for (var q = 0; q < data.entries.length; q++) {
    if (data.entries[q] === data.editing) {
      data.entries.splice(q, 1);
    }
  }

  while ($entryList.firstChild) {
    $entryList.removeChild($entryList.firstChild);
  }

  for (var r = 0; r < data.entries.length; r++) {
    var $entry = createEntryTree(data.entries[r]);
    $entryList.appendChild($entry);
  }

  if (data.entries.length > 0) {
    $noEntry.className = 'no-entry hidden';
  } else {
    $noEntry.className = 'no-entry';
  }

  $deleteModal.className = 'modal-background hidden';

  for (var s = 0; s < $viewTab.length; s++) {
    var $changeForm = $viewTab[s].getAttribute('data-view');
    if ($changeForm === 'entries') {
      $viewTab[s].className = 'view-tab';
    } else {
      $viewTab[s].className = 'view-tab hidden';
    }
  }
}

$photoURL.addEventListener('input', updatePhoto);
$form.addEventListener('submit', saveEntry);
window.addEventListener('DOMContentLoaded', loadData);
$entryTab.addEventListener('click', changeView);
$newEntryPage.addEventListener('click', changeView);
$entryList.addEventListener('click', editEntry);
$delete.addEventListener('click', deleteCheck);
$cancel.addEventListener('click', cancelDelete);
$confirm.addEventListener('click', confirmDelete);
