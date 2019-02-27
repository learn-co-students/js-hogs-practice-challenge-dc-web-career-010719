document.addEventListener("DOMContentLoaded",() => {
let newHogForm = document.querySelector("#form")
newHogForm.addEventListener("submit", createNewHog)
fetchHogs()

function fetchHogs(){
  fetch("http://localhost:3000/hogs")
  .then(res => res.json())
  .then(json => json.forEach(function(hog){renderHog(hog)}))
}

function renderHog(hog){

  let hogContainer = document.querySelector("#hog-container")
  let hogCard = document.createElement("div")
  hogCard.classList.add("hog-card")
  hogContainer.appendChild(hogCard)

  let hogImg = document.createElement('img')
  hogImg.src = hog.image
  let hogName = document.createElement("h2")
  hogName.innerHTML = hog.name
  let hogSpecialty = document.createElement("div")
  hogSpecialty.innerHTML = `Specialty: ${hog.specialty}`
  let hogMedal = document.createElement("div")
  hogMedal.innerHTML = `Medal: ${hog["highest medal achieved"]}`
  let hogWeight = document.createElement("div")
  hogWeight.innerHTML = `Weight: ${hog["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]}`
  let greasedLabel= document.createElement("label")
  greasedLabel.innerHTML = "Greased"
  let hogGreased = document.createElement("input")
  hogGreased.type = "checkbox"

  if (hog.greased == true){
    hogGreased.checked = true;
  }else{
    hogGreased.checked = false;
  }

  hogGreased.id = hog.id;
  greasedLabel.appendChild(hogGreased)

  let deleteButton = document.createElement("button")
  deleteButton.innerHTML = "Delete"
  deleteButton.id = hog.id
  hogCard.append(hogImg, hogName, hogSpecialty, hogMedal, hogWeight, greasedLabel, deleteButton)

  hogGreased.addEventListener('click', greaseHog)
  deleteButton.addEventListener('click', deleteHog)

}


function createNewHog(e){
e.preventDefault
  let data = {
    name: e.target.name.value,
    specialty: e.target.specialty.value,
    greased: e.target.greased.checked,
    "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": e.target.weight.value,
    "highest medal achieved" : e.target.medal.value,
    image: e.target.img.value
  }

  renderHog(data)

 fetch('http://localhost:3000/hogs',{
   method: "POST",
   headers:{
     "Content-Type": "application/json",
     Accept: "application/json"
   },
   body: JSON.stringify(data)
 })
}

function greaseHog(e){
let checkBox = e.target
let data = {greased : checkBox.checked}
fetch(`http://localhost:3000/hogs/${e.target.id}`,{
  method: "PATCH",
  headers:{
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify(data)})

}
function deleteHog(e){
e.path[1].remove()
fetch(`http://localhost:3000/hogs/${e.target.id}`,{
  method: "DELETE"})
}






})
