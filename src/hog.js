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
    // hogDiv.appendChild(this.greasedCheckbox())
    return hogDiv
  }

  greasedCheckbox() {
    
  }

  static postHog(id, name, specialty, weight, highestMedal, image) {
    fetch(Hog.api, {
      method: post,
      headers: {

      },
      body: {
        
      }
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