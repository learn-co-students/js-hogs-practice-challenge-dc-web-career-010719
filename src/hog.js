class Hog {
  constructor({id, name, speciality, greased, weight, medal, image}) {
    this.id = id
    this.name = name
    this.speciality = speciality
    this.greased = greased
    this.weight = weight
    this.medal = medal
    this.image = image
  }

  /* api */
  
  static async all() {
    // fetch(Hog.api)
    //   .then(res => res.json())
    //   .then(json => {
    //     return hogs.
    //   })
    const res = await fetch(Hog.api);
    const hogs = await res.json();
    return hogs.map(h => new Hog(h));
  }

  static async find(id) {
    const res = await fetch(`${Hog.api}/${id}`);
    const hog = await res.json();
    return new Hog(hog);
  }

  attributes() {
    return {
      id: this.id,
      name: this.name,
      speciality: this.speciality,
      greased: this.greased,
      weight: this.weight,
      medal: this.medal,
      image: this.imsage
    }
  }

  update() {
    const opts = {
      method: 'PATCH',
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(this.attributes())
    }
    fetch(`${Hog.api}/${this.id}`, opts);
  }

  delete() {
    fetch(`${Hog.api}/${this.id}`, { method: 'DELETE' });
  }
}

Hog.api = 'http://localhost:3000/'
// Hog.store = []