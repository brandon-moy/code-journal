/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('journal-data');

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

function beforeUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('journal-data', dataJSON);
}

window.addEventListener('beforeunload', beforeUnload);
