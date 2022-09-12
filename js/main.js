var $img = document.querySelector('.journal-image');
var $photoURL = document.querySelector('#img-url');

function updatePhoto(input) {
  $img.setAttribute('src', $photoURL.value);
}

$photoURL.addEventListener('input', updatePhoto);
