class Hog {
  constructor(id, name, specialty, greased, weight, highestMedal, image) {
    this.id = id
    this.name = name
    this.specialty = specialty
    this.greased = greased
    this.weight = weight
    this.highestMedal = highestMedal
    this.image = image
    Hog.all.push(this)
  }

  createHogDiv() {
    const hogDiv = document.createElement('div')
    hogDiv.className = 'hog-card'
    hogDiv.id = `hog-${this}`
    hogDiv.innerHTML = `<h2>${this.name}</h2>
                        <p>Specialty: ${this.specialty}</p>
                        <p>weight: ${this.weight}</p>
                        <p>Highest Medal Achieved: ${this.highestMedal}</p>`
    const hogImg = document.createElement('img')
    hogImg.src = this.image
    hogDiv.appendChild(hogImg)
    hogDiv.appendChild(this.greasedCheckbox())
    return hogDiv
  }

  greasedCheckbox() {
    let checkdiv = document.createElement('div')
    checkdiv.innerHTML = 'Greased: '
    let checkbox = document.createElement('input')
    checkbox.setAttribute("type", "checkbox")
    checkbox.checked = this.greased
    checkbox.id = `check-${this.id}`
    checkbox.addEventListener('click', () => {this.handleCheckbox(checkbox.checked)})
    checkdiv.appendChild(checkbox)
    return checkdiv
  }

  handleCheckbox(checkboxBool) {
    this.patchHog(checkboxBool)
  }

  patchHog(checkboxBool) {
    fetch(Hog.api + `/${this.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "greased": checkboxBool
      })
    })
  }

  static postHog(name, specialty, greased, weight, highestMedal, image) {
    const hogCollection = document.getElementById('hog-container')
    fetch(Hog.api, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "specialty": specialty,
        "greased": greased,
        "weight": weight,
        "highest medal achieved": highestMedal,
        "image": image
      })
    }).then(resp => resp.json())
      .then(jsonHogulo => {
        let pig = new Hog(jsonHogulo.id, jsonHogulo.name, jsonHogulo.specialty, jsonHogulo.greased, jsonHogulo.weight, jsonHogulo["highest medal achieved"], jsonHogulo.image)
        hogCollection.appendChild(pig.createHogDiv())
      })
  }

  static acquireHogs(callback) {
    fetch(Hog.api)
    .then(resp => resp.json())
    .then(jsonHogulo => {
        jsonHogulo.forEach(pig => {
            new Hog(pig.id, pig.name, pig.specialty, pig.greased, pig.weight, pig["highest medal achieved"], pig.image)
        })
        callback.call()
    })
  }

}
Hog.api = 'http://localhost:3000/hogs'
Hog.all = []