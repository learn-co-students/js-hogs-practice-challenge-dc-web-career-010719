
class Hog {

  constructor(id, name, specialty, greased, weight, medal, image) {
    this.id = id,
    this.name = name,
    this.specialty = specialty,
    this.greased = greased,
    this.weight = weight,
    this.medal = medal,
    this.image = image
    this.renderHog()
  }

  renderHog() {

    let hogArea = document.getElementById('hog-container')
    let div = document.createElement('div')
    hogArea.appendChild(div)
    div.classList.add('hog-card')
    div.id = `hog-${this.id}`

    let h2 = document.createElement('h2')
    div.appendChild(h2)
    h2.innerText = this.name

    let img = document.createElement('img')
    div.appendChild(img)
    img.src = this.image

    let sP = document.createElement('p')
    div.appendChild(sP)
    sP.innerText = `Specialty: ${this.specialty}`

    let sW = document.createElement('p')
    div.appendChild(sW)
    sW.innerText = `Weight: ${this.weight}`

    let sM = document.createElement('p')
    div.appendChild(sM)
    sM.innerText = `Highest Medal Achieved: ${this.medal}`

    let greaseBox = document.createElement('p')
    let checked = this.greased === true ? 'checked' : ''
    // debugger
    div.appendChild(greaseBox)
    greaseBox.innerHTML = `<p>Greased: <input id="grease-${this.id}" class="toggle" type="checkbox" name="greased" value="greased" ${checked}><br></p>`

    greaseBox.addEventListener('click', this.toggleGrease)

    let delBtn = document.createElement('button')
    div.appendChild(delBtn)
    delBtn.innerText = "Delete"
    delBtn.id = this.id

    delBtn.addEventListener('click', this.deleteHog)
  }

  toggleGrease(e) {
    let id = e.target.id.split('-')[1]
    let greaseVal = e.target.checked
    fetch(`http://localhost:3000/hogs/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify( {
        greased: greaseVal
      })
    })
  }

  deleteHog(){
    fetch(`http://localhost:3000/hogs/${this.id}`, {
      method: "DELETE"
    })
    .then( () => {
      let hogCard = document.getElementById(`hog-${this.id}`)
      document.getElementById('hog-container').removeChild(hogCard)
    })
  }

}
















//
