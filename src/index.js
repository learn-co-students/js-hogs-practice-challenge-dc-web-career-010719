document.addEventListener("DOMContentLoaded", init)

function init(){
  const form = document.querySelector("form")
  
  getHogs()
  form.addEventListener("submit", (e) => {
    e.preventDefault(), createHog(form)
  })
}

function getHogs(){
  fetch(`http://localhost:3000/hogs`)
    .then(res => res.json())
    .then(json => {
      json.forEach((hog) => renderHog(hog))})
}

function renderHog(hog){
  const hogContainer = document.querySelector("#hog-container")
  const hogDiv = document.createElement("div")
  const name = document.createElement("h3")
  const img = document.createElement("img")
  const medal = document.createElement("p")
  const greased = document.createElement("INPUT")
  const greaseLabel = document.createElement("span")
  const spec = document.createElement("p")
  const weight = document.createElement("p")
  const delBtn = document.createElement("button")
  
  hogDiv.id = hog.id
  hogDiv.className = "hog-card"
  name.innerText = hog.name
  img.src = hog.image
  medal.innerText = "Highest Medal Achieved: " + hog["highest medal achieved"]
  greased.setAttribute("type", "checkbox")
  greased.addEventListener("change", (e) => greasedUpdate(hog, e))
  greased.checked = greasedCheck(hog)
  greaseLabel.innerText = "Greased?"
  spec.innerText = "Specialty: " + hog.specialty
  weight.innerText = "Weight: " + hog["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]
  delBtn.innerText = "Delete Hog"
  delBtn.addEventListener("click", () => deleteHog(hog))
  
  hogDiv.append(name, img, medal, greaseLabel, greased, spec, weight, delBtn)
  hogContainer.appendChild(hogDiv)
  
}

function greasedCheck(hog){
  return hog.greased ? true : false
}

function greasedUpdate(hog, e) {
  const data = {}
  if (e.target.checked) {
    data.greased = true
  } else {
    data.greased = false
  }
  
  fetch(`http://localhost:3000/hogs/${hog.id}`, {
    method: "PATCH",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(console.log)
}

function createHog(form) {
  const name = form.name.value
  const specialty = form.specialty.value
  const medal = form.medal.value
  const weight = form.weight.value
  const img = form.img.value
  const greased = form.greased.checked
  
  const data = {name: name, specialty: specialty, "highest medal achieved": medal, "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": weight, image: img, greased: greased}
    
  fetch(`http://localhost:3000/hogs`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) })
  .then(res => res.json())
  .then((hog) => {renderHog(hog)})
  
  form.reset()

}

function deleteHog(hog) {
  const hogToRemove = document.getElementById(`${hog.id}`)
  const hogContainer = document.querySelector("#hog-container")
  
  hogContainer.removeChild(hogToRemove)
  
  fetch(`http://localhost:3000/hogs/${hog.id}`, {
    method: "DELETE" })
  .then(res => res.json())
  .then(alert("Oink Oink!"))
}


























