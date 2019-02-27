document.addEventListener("DOMContentLoaded", init)

function init() {
    Hog.acquireHogs(populateHogs)
    activateForm()
}

function populateHogs() {
    const hogCollection = document.getElementById('hog-container')
    Hog.all.forEach(pig => {
        hogCollection.appendChild(pig.createHogDiv())
    })
}

function activateForm() {
    document.querySelector('form').addEventListener('submit', handleForm)
}

function handleForm() {
    const name = document.querySelector("input[name='name']").value
    const specialty = document.querySelector("input[name='specialty']").value
    const medal = document.querySelector("input[name='medal']").value
    const weight = document.querySelector("input[name='weight']").value
    const image = document.querySelector("input[name='img']").value

}

