document.addEventListener('DOMContentLoaded', (e)=>{fetchHogs(e); hogForm()})

// getters
function getHogContainer() {
  return document.getElementById('hog-container')
}

function getHogForm() {
  return document.getElementById('hog-form')
}

// get hogs
function fetchHogs() {
  fetch(`http://localhost:3000/hogs`)
  .then(res=>res.json())
  .then(hogArray=>hogArray.forEach(renderHog))
}

// render hog
function renderHog(hog) {
  let div = document.createElement('div')
  div.id = hog.id
  div.className ="hog-card"

  let name = document.createElement('p')
  name.innerText = "Name: " +hog.name
  div.appendChild(name)

  let specialty = document.createElement('p')
  specialty.innerText = "Specialty: " +hog.specialty
  div.appendChild(specialty)

  let greasedLabel = document.createElement("label")
  greasedLabel.innerText = "Greased: "
  let greased = document.createElement("input")
  greased.setAttribute("type", "checkbox")
  greased.checked = hog.greased
  greased.dataset.id = hog.id
  greased.dataset.checked = hog.greased
  greased.addEventListener('change', fetchCheck)
  div.appendChild(greasedLabel)
  div.appendChild(greased)

  let weight = document.createElement('p')
  weight.innerText = "Weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water: " + hog[`weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water`]
  div.appendChild(weight)

  let medal = document.createElement('p')
  medal.innerText = "Highest Medal Achieved" + hog["highest medal achieved"]
  div.appendChild(medal)

  let image = document.createElement('img')
  image.src = hog.image
  div.appendChild(image)

  let br = document.createElement('br')
  div.appendChild(br)

  let button = document.createElement('button')
  button.innerText = "Delete Hog"
  button.dataset.hogId = hog.id
  button.addEventListener('click', (e)=>{fetchDelete(e,div)})
  div.appendChild(button)

  getHogContainer().appendChild(div)
}

//create hog via form 
function hogForm() {
  getHogForm().addEventListener('submit', handleHog)
}

// handle submit form to be passed to fetch for new hog
function handleHog(e) {
  e.preventDefault
  let hog = {
    name: e.currentTarget[0].value,
    specialty: e.currentTarget[1].value,
    greased: e.currentTarget[5].checked,
    "highest medal achieved": e.currentTarget[2].value,
    "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": e.currentTarget[3].value,
    image: e.currentTarget[4].value
  }
  fetchNewHog(hog)
}

// fetch new hog and call the render function
function fetchNewHog(hog) {
  fetch(`http://localhost:3000/hogs`, {method: "POST",
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(hog)})
  .then(res=>res.json())
  .then(hog=>renderHog)
}

//fetch delete
function fetchDelete(e,hogDiv) {
  let hogId = e.target.dataset.hogId
  fetch(`http://localhost:3000/hogs/${hogId}`, {method: "DELETE"})
  .then(res => res.json())
  .then(hogDiv.remove())
}

//fetch patch for checkbox

function fetchCheck(e) {
  let hogId = e.target.dataset.id
  let hogChecked = JSON.parse(e.target.dataset.checked)
  let newCheck = !hogChecked
  data = {greased: newCheck }
  fetch(`http://localhost:3000/hogs/${hogId}`, {method: "PATCH",
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(data)})
}
