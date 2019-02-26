// almost all eventListeners would go in here, except for instance adding to the html on creation
// anything app logic, api calls, filters


// procedural solution
document.addEventListener('DOMContentLoaded', () => {
  fetchHogs()
  let form = document.getElementById('hog-form')
  form.addEventListener('submit', newHog)
})

function fetchHogs () {
  fetch('http://localhost:3000/hogs')
  .then(res => res.json())
  .then(hogs => {
    hogs.forEach((hog) => showHog(hog))
  })
}

function showHog (hog) {
  let hogCont = document.getElementById('hog-container')
  let hogDiv = document.createElement('div')
  let nameHeader = document.createElement('h2')
  let specialty = document.createElement('p')
  let greasedLabel = document.createElement('label')
  let greased = document.createElement('input')
  let weight = document.createElement('p')
  let medal = document.createElement('p')
  let img = document.createElement('img')
  let btnP = document.createElement('p')
  let deleteBtn = document.createElement('button')

  hogDiv.className = 'hog-card'
  hogDiv.setAttribute('id', `hog-${hog.id}`)
  nameHeader.innerText = `${hog.name}`
  specialty.innerText = `Specialty: ${hog.specialty}`
  greasedLabel.innerText = 'Greased: '
  greased.type = 'checkbox'
  if (hog.greased) {
    greased.checked = true
  }
  greased.setAttribute('id', `edit-hog-${hog.id}`)
  weight.innerText = `weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water: ${hog['weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water']}`
  medal.innerText = `Highest Medal: ${hog['highest medal achieved']}`
  img.src = `${hog.image}`
  deleteBtn.innerText = 'Delete This Hog'
  deleteBtn.setAttribute('id', `del-hog-${hog.id}`)

  hogCont.appendChild(hogDiv)
  hogDiv.appendChild(nameHeader)
  hogDiv.appendChild(specialty)
  hogDiv.appendChild(greasedLabel)
  hogDiv.appendChild(greased)
  hogDiv.appendChild(weight)
  hogDiv.appendChild(medal)
  hogDiv.appendChild(img)
  hogDiv.appendChild(btnP)
  btnP.appendChild(deleteBtn)

  greased.addEventListener('click', editHog)
  deleteBtn.addEventListener('click', deleteHog)
}

function newHog (e) {
  e.preventDefault()
  let name = document.getElementsByName('name')[0].value
  let specialty = document.getElementsByName('specialty')[0].value
  let medal = document.getElementsByName('medal')[0].value
  let weight = document.getElementsByName('weight')[0].value
  let img = document.getElementsByName('img')[0].value
  let greased = document.getElementsByName('greased')[0].checked

  let data = {
    name: name,
    specialty: specialty,
    greased: greased,
    "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": weight,
    "highest medal achieved": medal,
    image: img
  }

  fetch('http://localhost:3000/hogs', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
  .then(res => res.json())
  .then(hog => {
    showHog(hog)
    document.getElementById('hog-form').reset
  })
}

function deleteHog (e) {
  let id = e.currentTarget.id.split('-')[2]

  fetch(`http://localhost:3000/hogs/${id}`,
  {method: 'delete'})
  .then(res => res.json())
  .then(json => {
    document.getElementById(`hog-${id}`).remove()
  })
}

function editHog (e) {
  let id = e.currentTarget.id.split('-')[2]
  let greased = document.getElementById(`edit-hog-${id}`).checked

  fetch(`http://localhost:3000/hogs/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({greased: greased}),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
  .then(res => res.json())
}
