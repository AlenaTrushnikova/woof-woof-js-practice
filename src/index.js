const dogURL = "http://localhost:3000/pups"

document.addEventListener('DOMContentLoaded', () => {
    const goodDogFilter = document.querySelector('#good-dog-filter')
    goodDogFilter.addEventListener('click', (e) => {
        if (e.target.innerText === 'Filter good dogs: OFF') {
            e.target.innerText = 'Filter good dogs: ON'
        } else {
            e.target.innerText = 'Filter good dogs: OFF'
        }
        fetchDogs()
    })
    fetchDogs()
})

function fetchDogs() {
    fetch(dogURL)
        .then(resp => resp.json())
        .then(dogs => {
            const goodDogFilter = document.querySelector('#good-dog-filter')
            if (goodDogFilter.innerText === 'Filter good dogs: ON') {
                let goodDogs = dogs.filter(dog => dog.isGoodDog === true)
                renderDogs(goodDogs)
            } else {
                renderDogs(dogs)
            }
        })
}

function patchDog(dog) {
    fetch(dogURL + `/${dog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(dog)
    })
        .then(resp => resp.json())
}

function renderDogs(dogs) {
    const dogDiv = document.querySelector('#dog-bar')
    dogDiv.innerHTML = ""
    dogs.forEach(dog => {
        const dogSpan = document.createElement("span")
        dogSpan.id = dog.id
        dogSpan.textContent = dog.name
        dogDiv.appendChild(dogSpan)
        dogSpan.addEventListener('click', () => showDogInfo(dog))
    })
}

function showDogInfo(dog) {
    let dogInfoDiv = document.querySelector('#dog-info')
    dogInfoDiv.innerHTML = ''
    let image = document.createElement('img')
    let h2 = document.createElement('h2')
    let button = document.createElement('button')
    image.src = dog.image
    h2.textContent = dog.name
    if (dog.isGoodDog) {
        button.textContent = 'Good Dog'
    } else {
        button.textContent = "Bad Dog"
    }
    dogInfoDiv.append(image, h2, button)
    button.addEventListener('click', () => goodBadDog(dog))
}

function goodBadDog(dog) {
    if (dog.isGoodDog == false) {
        dog.isGoodDog = true
    } else {
        dog.isGoodDog = false
    }
    showDogInfo(dog)
    patchDog(dog)
}