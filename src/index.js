let hogContainer
let form

document.addEventListener("DOMContentLoaded", init)

function init() {
  hogContainer = document.querySelector('#hog-container')
  getAllHogs()

  form = document.querySelector('#hog-form')
  form.addEventListener('submit', handleClickOfSubmit)
}

function getAllHogs() {
  fetch('http://localhost:3000/hogs')
  .then(res => res.json())
  .then(allHogsData => {
    allHogsData.forEach(renderHog)
  })
}

function renderHog(hogObj) {
  let div = document.createElement('div')
  hogContainer.appendChild(div)
  div.classList.add('hog-card')
  div.id = "hog-" + hogObj.id

  let img = document.createElement('img')
  div.appendChild(img)
  img.src = hogObj.image

  let h2 = document.createElement('h2')
  div.appendChild(h2)
  h2.innerText = hogObj.name

  let checkbox = document.createElement('input')
  div.appendChild(checkbox)
  checkbox.type = "checkbox"
  checkbox.dataset.id = hogObj.id
  checkbox.id = "checkbox-" + hogObj.id
  if (hogObj.greased === true) {
    checkbox.checked = true
  } else {
    checkbox.checked = false
  }
  let label = document.createElement('label')
  div.appendChild(label)
  label.for = `checkbox-${hogObj.id}`
  label.innerText = "greased"
  checkbox.addEventListener('change', handleChangeOfCheckbox)

  let p3= document.createElement('p')
  div.appendChild(p3)
  p3.innerText = `specialty: ${hogObj.specialty}`

  let p1 = document.createElement('p')
  div.appendChild(p1)
  p1.innerText = `weight: ${hogObj["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]}`

  let p2 = document.createElement('p')
  div.appendChild(p2)
  p2.innerText = `medal: ${hogObj['highest medal achieved']}`

  let deleteButton = document.createElement('button')
  div.appendChild(deleteButton)
  deleteButton.innerText = "Delete"
  deleteButton.dataset.id = hogObj.id
  deleteButton.addEventListener('click', handleClickOfDeleteButton)
}

function handleClickOfSubmit(event) {
  event.preventDefault()
  postNewHog()
}

function postNewHog() {
  let postData = {
    name: document.querySelectorAll('input')[0].value,
    specialty: document.querySelectorAll('input')[1].value,
    "highest medal achieved": document.querySelectorAll('input')[2].value,
    "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": parseInt(document.querySelectorAll('input')[3].value),
    image: document.querySelectorAll('input')[4].value,
  }
  if (document.querySelectorAll('input')[5].checked === true) {
    postData.greased = true
  } else {
    postData.greased = false
  }
  document.querySelectorAll('input')[0].value = ''
  document.querySelectorAll('input')[1].value = ''
  document.querySelectorAll('input')[2].value = ''
  document.querySelectorAll('input')[3].value = ''
  document.querySelectorAll('input')[4].value = ''
  document.querySelectorAll('input')[5].checked = false
  fetch('http://localhost:3000/hogs', {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }).then(res => res.json())
    .then(newHogData => {
      renderHog(newHogData)
    })
}

function handleClickOfDeleteButton(event) {
  let id = event.currentTarget.dataset.id
  fetch(`http://localhost:3000/hogs/${id}`, {
    method: "DELETE"
  }).then(res => res.json())
    .then(() => {
      document.querySelector(`#hog-${id}`).remove()
    })
}

function handleChangeOfCheckbox(event) {
  let id = event.currentTarget.dataset.id
  let patchData
  if (document.querySelector(`#checkbox-${id}`).checked === true) {
    patchData = {
      greased: true
    }
  } else {
    patchData = {
      greased: false
    }
  }
  fetch(`http://localhost:3000/hogs/${id}`, {
    method: "PATCH",
    body: JSON.stringify(patchData),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
}
