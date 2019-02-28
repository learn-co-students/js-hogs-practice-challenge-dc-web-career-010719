class Hog {
  constructor(id, name, specialty, greased, weight, medal, image) {
    this.id = id;
    this.name = name;
    this.specialty = specialty;
    this.greased = greased;
    this.weight = weight;
    this.medal = medal;
    this.image = image;
    this.renderHog();
  }

  renderHog() {
    let container = document.querySelector('#hog-container');

    let hogDiv = document.createElement('div');
    hogDiv.dataset.divId = this.id;
    hogDiv.classList = 'hog-card';

    let name = document.createElement('H2');
    name.innerText = `${this.name}`;

    let specialty = document.createElement('p');
    specialty.innerText = `Specialty: ${this.specialty}`;

    let weight = document.createElement('p');
    weight.innerText = `Weight Ratio: ${this.weight}`;

    let medal = document.createElement('p');
    medal.innerText = `Highest Medal Achieved: ${this.medal}`;

    let image = document.createElement('img');
    image.src = this.image;

    let greased = document.createElement('span');
    greased.innerText = 'Greased: ';

    let checked = document.createElement('input');
    checked.type = 'checkbox';
    checked.dataset.greasedId = this.id;
    checked.addEventListener('click', () => this.toggleBtn());

    //

    checked.checked = this.greased ? true : false;

    greased.appendChild(checked);

    // let checked = this.greased === true ? 'checked' : '';
    // greased.innerHTML = `Greased: <input type="checkbox" data-greased-id="${
    //   this.id
    // }" ${checked}></input>`;
    let deleteP = document.createElement('p');
    let deleteBtn = document.createElement('button');

    deleteBtn.addEventListener('click', () => this.deleteHog());

    deleteBtn.innerText = `Delete ${this.name}`;
    deleteBtn.dataset.deleteId = this.id;

    deleteP.appendChild(deleteBtn);

    hogDiv.append(name, image, specialty, weight, medal, greased, deleteP);

    container.append(hogDiv);
  }

  deleteHog() {
    fetch(`http://localhost:3000/hogs/${this.id}`, {
      method: 'DELETE'
    }).then(res => res.json());

    let deleteDiv = document.querySelector(`[data-div-id="${this.id}"]`);
    deleteDiv.remove();
  }

  toggleBtn() {
    let checked = document.querySelector(`[data-greased-id="${this.id}"`)
      .checked;

    let data = { greased: checked };

    fetch(`http://localhost:3000/hogs/${this.id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => console.log(json));
  }
}
