document.addEventListener('DOMContentLoaded', init)

function init(){
    getHogs()
    let form = document.getElementById('hog-form')
    form.addEventListener('submit', newHog)
}

function getHogs(){
    fetch('http://localhost:3000/hogs')
    .then(res => res.json())
    .then(hogs => hogs.forEach(showHog))
    
}

function showHog(hog) {
   let hogCon = document.getElementById('hog-container')
   let hogDiv = document.createElement('div')
   let h2 = document.createElement('h2')
   let hogSpec = document.createElement('p')
   //label
    let grease = document.createElement('input')
    let weight = document.createElement('p')
    let medal = document.createElement('p')
    let image = document.createElement('img')
    let deleteBtn = document.createElement('button')

    hogDiv.classList.add('hog-card')
    hogDiv.setAttribute('id', `hog-${hog.id}`)

    h2.innerText = hog.name

    hogSpec.innerText = hog.specialty

    grease.type = 'checkbox'
    if(hog.greased){
        grease.checked = true
    }
    grease.setAttribute('id', `edit-hog-${hog.id}`)

    weight.innerText = `${hog['weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water']}`

    medal.innerText = `${hog['highest medal achieved']}`

    image.src = hog.image

    deleteBtn.innerText = 'delete'
    deleteBtn.setAttribute('id', `del-hog-${hog.id}`)

    hogCon.appendChild(hogDiv)
    hogDiv.append(h2, hogSpec, grease, weight, medal, image, deleteBtn)

    grease.addEventListener('click', editHog)
    deleteBtn.addEventListener('click', deleteHog)
}

function newHog(e) {
    e.preventDefault()
    let name = document.getElementsByName('name')[0].value
    let specialty = document.getElementsByName('specialty')[0].value
    let medal = document.getElementsByName('medal')[0].value
    let weight = document.getElementsByName('weight')[0].value
    let image = document.getElementsByName('img')[0].value
    let grease = document.getElementsByName('greased')[0].checked

    let data = {
        name: name,
        specialty: specialty,
        greased: grease,
        "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": weight,
        "highest medal achieved": medal,
        image: image
    }
    fetch('http://localhost:3000/hogs', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(res => res.json())
        .then(hog => {
            showHog(hog)
            document.getElementById('hog-form').reset()
        })
    
}

function editHog(e) {
    let id = e.target.id.split('-')[2]
    let greased = document.getElementById(`edit-hog-${id}`).checked

    fetch(`http://localhost:3000/hogs/${id}`, {
        method: "PATCH",
        body: JSON.stringify({greased: greased}),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(res => res.json())
}

function deleteHog(e) {
    let id = e.target.id.split('-')[2]
    fetch(`http://localhost:3000/hogs/${id}`, {
        method: "DELETE"
    }).then(res => res.json())
        .then(json => {
            document.getElementById(`hog-${id}`).remove()
        })
}