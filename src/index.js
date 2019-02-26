
document.addEventListener('DOMContentLoaded', init)

function init() {
  renderHogs()

  document.getElementById('hog-form').addEventListener('submit', addHog)
}

function renderHogs() {
  let hogArea = document.getElementById('hog-container')
  hogArea.innerHTML = ''

  fetch('http://localhost:3000/hogs')
  .then(resp => resp.json())
  .then(json => json.forEach( (hog) => {
    new Hog(hog.id, hog.name, hog.specialty, hog.greased, hog.weight, hog["highest medal achieved"], hog.image)
  }))
}

function addHog(e) {
  e.preventDefault()
  // debugger
  data = {
    name: e.target.children[0].value,
    specialty: e.target.children[2].value,
    medal: e.target.children[4].value,
    weight: e.target.children[6].value,
    image: e.target.children[8].value,
    greased: e.target.children[10].firstElementChild.checked
  }
  fetch('http://localhost:3000/hogs', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(resp => resp.json())
  .then(hog => {
    debugger
    new Hog(hog.id, hog.name, hog.specialty, hog.greased, hog.weight, hog.medal, hog.image)
  })
  renderHogs()
}













//
