document.addEventListener("DOMContentLoaded", init)

function init() {
  getAllHogs()

  let hogForm = getHogForm()
  hogForm.addEventListener('submit', handleSubmitOfForm)
}

function getAllHogs() {
  fetch('http://localhost:3000/hogs')
  .then(res => res.json())
  .then(allHogObjs => {
    allHogObjs.forEach(renderHog)
  })
}

function renderHog(hogObj) {
  let hogContainer = getHogContainer()

  let hogCard = document.createElement('div')
  hogContainer.appendChild(hogCard)
  hogCard.id = 'hog-card-' + hogObj.id
  hogCard.classList.add('hog-card')

  let image = document.createElement('img')
  hogCard.appendChild(image)
  image.src = hogObj.image

  let nameHolder = document.createElement('h2')
  hogCard.appendChild(nameHolder)
  nameHolder.innerText = hogObj.name

  let specialtyHolder = document.createElement('p')
  hogCard.appendChild(specialtyHolder)
  specialtyHolder.innerText = `Specialty: ${hogObj.specialty}`

  let greasedLabel = document.createElement('label')
  hogCard.appendChild(greasedLabel)
  greasedLabel.for = 'greased-checkbox-' + hogObj.id
  greasedLabel.innerText = "Greased:"
  let greasedCheckbox = document.createElement('input')
  hogCard.appendChild(greasedCheckbox)
  greasedCheckbox.id = 'greased-checkbox-' + hogObj.id
  greasedCheckbox.dataset.id = hogObj.id
  greasedCheckbox.type = 'checkbox'
  if (hogObj.greased === true) {
    greasedCheckbox.checked = true
  } else {
    greasedCheckbox.checked = false
  }
  greasedCheckbox.addEventListener('change', handleChangeOfGreasedCheckbox)

  let weightHolder = document.createElement('p')
  hogCard.appendChild(weightHolder)
  weightHolder.innerText = `Weight: ${hogObj["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]}`

  let medalHolder = document.createElement('p')
  hogCard.appendChild(medalHolder)
  medalHolder.innerText = `Medal: ${hogObj["highest medal achieved"]}`

  let hogDeleteButton = document.createElement('button')
  hogCard.appendChild(hogDeleteButton)
  hogDeleteButton.innerText = "Delete"
  hogDeleteButton.dataset.id = hogObj.id
  hogDeleteButton.addEventListener('click', handleClickOfHogDeleteButton)
}

function handleSubmitOfForm(event) {
  event.preventDefault()
  postNewHog()
}

function postNewHog() {
  fetch('http://localhost:3000/hogs', {
    method: "POST",
    body: JSON.stringify(getPostData()),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }).then(res => res.json())
    .then(newHogObj => {renderHog(newHogObj)})
}

function handleClickOfHogDeleteButton(event) {
  let hogId = event.currentTarget.dataset.id
  getHogCard(hogId).remove()
  deleteHog(hogId)
}

function deleteHog(hogId) {
  fetch(`http://localhost:3000/hogs/${hogId}`, {
    method: "DELETE"
  })
}

function handleChangeOfGreasedCheckbox(event) {
  let hogId = event.currentTarget.dataset.id
  patchGreasedOfHog(hogId)
}

function patchGreasedOfHog(hogId) {
  fetch(`http://localhost:3000/hogs/${hogId}`, {
    method: "PATCH",
    body: JSON.stringify(getPatchDataForGreased(hogId)),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
}

//Helper Functions
function getHogContainer() {
  return document.querySelector('#hog-container')
}

function getHogForm() {
  return document.querySelector("#hog-form")
}

function getPostData() {
  let postData = {}
  postData.name = getFormInputs()[0].value
  postData.specialty = getFormInputs()[1].value
  postData["highest medal achieved"] = getFormInputs()[2].value
  postData["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"] = getFormInputs()[3].value
  postData.image = getFormInputs()[4].value
  if (getFormInputs()[5].checked === true) {
    postData.greased = true
  } else {
    postData.greased = false
  }
  for (const index in getFormInputs()) {
    if (index === 5) {
      getFormInputs()[index].checked = false
    } else if (index < 5) {
      getFormInputs()[index].value = ''
    }
  }
  return postData
}

function getFormInputs() {
  return document.querySelectorAll("input")
}

function getHogCard(hogId) {
  return document.querySelector(`#hog-card-${hogId}`)
}

function getPatchDataForGreased(hogId) {
  if (document.querySelector(`#greased-checkbox-${hogId}`).checked === true) {
    return {greased: true}
  } else {
    return {greased: false}
  }
}
