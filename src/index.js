document.addEventListener('DOMContentLoaded', () => {
  init();
});

function baseUrl() {
  return 'http://localhost:3000/hogs';
}

function init() {
  fetchHogs();
}

function fetchHogs() {
  fetch(baseUrl())
    .then(res => res.json())
    .then(hogs =>
      hogs.forEach(hog => {
        new Hog(
          hog.id,
          hog.name,
          hog.specialty,
          hog.greased,
          hog.weight,
          hog.medal,
          hog.image
        );
      })
    );
}

document.querySelector('#form').addEventListener('submit', e => {
  addDog(e);
});

function addDog(e) {
  e.preventDefault();
  let name = document.querySelector('#name').value;
  let specialty = document.querySelector('#specialty').value;
  let medal = document.querySelector('#medal').value;
  let weight = parseInt(document.querySelector('#weight').value);
  let img = document.querySelector('#img').value;
  let checked = document.querySelector('#greased').value;

  let greased = checked === true ? true : false;

  data = {
    name: name,
    specialty: specialty,
    greased: greased,
    weight: weight,
    medal: medal,
    image: img
  };

  let submitForm = document.querySelector('#hog-form');

  submitForm.reset();

  fetch('http://localhost:3000/hogs/', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(
      data =>
        new Hog(
          data.id,
          data.name,
          data.specialty,
          data.greased,
          data.weight,
          data.medal,
          data.image
        )
    );
}
