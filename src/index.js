let hogs = []
let api = 'http://localhost:3000/hogs'

document.addEventListener('DOMContentLoaded', () => {
  renderHogs()
  hogForm().addEventListener('submit', handleSubmit)
})

/* api */

function loadHogs() {
  fetch(api)
    .then(res => res.json())
    .then(json => {
      hogs = json
      hogs.forEach(renderHog)
    })
}

function updateHog(hog) {
  const opts = {
    method: 'PATCH',
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(hog)
  }
  fetch(`${api}/${hog.id}`, opts)
    .then(renderHogs)
}

function deleteHog(hog) {
  const opts = {method: 'DELETE'}
  fetch(`${api}/${hog.id}`, opts)
    .then(res => removeHog(hog))
}

function addHog(hog) {
  if (typeof hog.name === 'undefined')
    throw 'Empty Hog Name!'

  const opts = {
    method: 'POST',
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(hog)
  }

  console.log(opts)
  fetch(api, opts)
    .then(res => res.json())
    .then(renderHog)
}

/* dom */

function renderHogs() {
  hogContainer().innerHTML = ''
  loadHogs()
}

function renderHog(hog) {
  const card = document.createElement('div')
  card.classList.add('hog-card')
  card.dataset.id = hog.id

  card.innerHTML += `<h2>${hog.name}</h2>`
  card.innerHTML += `<img src="${hog.image}" />`
  card.innerHTML += `<h3>${hog.specialty}</h3>`
  card.innerHTML += `<h3>${hog.weight}</h3>`
  card.innerHTML += `<h3>${hog.medal}</h3>`

  const deleteBtn = document.createElement('button')
  deleteBtn.innerText = 'Delete'
  deleteBtn.addEventListener('click', e => deleteHog(hog))
  card.appendChild(deleteBtn)

  hogContainer().appendChild(card)
}

function populateForm(hog) {
  hogForm().reset()

  const attrs = ["name", "specialty", "medal", "weight", "image"]
  attrs.forEach(attr => {
    const input = hogForm().querySelector(`input[name="${attr}"]`)
    input.value = hog[attr]
  })

  const greasedInput = hogForm().querySelector(`input[name="greased"]`)
  greasedInput.checked = hog.greased
}

function formObj(form) {
  const obj = {}
  const inputs = form.querySelectorAll('input:not([type="submit"])')

  inputs.forEach(input => {
    let val
    
    if (input.type === 'checkbox')
      val = input.checked || false
    else if (input.value && !isNaN(input.value)) 
      val = parseInt(input.value)
    else if (input.value)
      val = input.value

    obj[input.name] = val
  })

  return obj
}

function removeHog(hog) {
  hogCard(hog).remove()
}

/* event handlers */

function handleSubmit(e) {
  e.preventDefault()
  addHog(formObj(e.currentTarget))
  e.currentTarget.reset()
}

/* helpers */

function hogContainer() {
  return document.querySelector('#hog-container')
}

function hogForm() {
  return document.querySelector('#hog-form')
}

function hogFormObj() {
  return formObj(hogForm())
}

function hogCard(hog) {
  return document.querySelector(`[data-id="${hog.id}"]`)
}