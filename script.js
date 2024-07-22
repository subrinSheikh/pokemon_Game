const card1 = document.getElementById('card1');
const card2 = document.getElementById('card2');
const card_header = document.getElementById('card_header');
const card_header2 = document.getElementById('card_header2');
const fight = document.getElementById('fight');
let global = null;
let global2 = null;
let score1 = 0;
let score2 = 0;
const exp = function (data) {
    const bE = data.base_experience;
    return bE;
};
function getPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("cant find pokemon")
            }
            //console.log(response.json());
            return response.json();
        }).then((pokemon) => {
            //console.log(  id,"player1");
            global = pokemon;
            displayPokemon1(pokemon)
            const res = exp(pokemon);
            //console.log(res,"fight btn");
            //options(pokemon);
        })
        .catch((err) => {
            console.error(err);
        })
}
function getPlayer2(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("cant find pokemon")
            }
            return response.json();
        }).then((pokemon) => {
            global2 = pokemon;
            displayPokemon2(pokemon);
        })
        .catch((err) => {
            console.error(err);
        })
}
function getAllPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon/`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("cant find pokemon")
            }
            return response.json();
        }).then((pokemon) => {
            console.log(pokemon);
            const result = options(pokemon);
            shuffleIds(result);
            const result2 = options2(pokemon);
            shuffleIds2(result2);
        })
        .catch((err) => {
            console.error(err);
        })

}
getAllPokemon();

function displayPokemon1(data) {

    card_header.innerHTML = `
<span id="p1_name">Subrin</span>
<span id="p1_score">Score: ${score1}</span>`


    const array = data.abilities;
    // Set the initial innerHTML of card1
    card1.innerHTML = `
        <div id="img"><img src="${data.sprites.front_default}" alt="${data.name}"</div>
        <span id="name">${data.name}</span>
        <span id="experience">${data.base_experience}</span>
        <ul id="abilities">Abilities</ul>
    `;


    // Reference to the ul element inside card1
    const ul = card1.querySelector('#abilities');


    // Iterate over the abilities array and append li elements to ul
    for (let i = 0; i < array.length; i++) {
        const li = document.createElement('li');
        li.textContent = array[i].ability.name;
        ul.appendChild(li);
    }


}
function displayPokemon2(data) {

    card_header2.innerHTML = `
    <span id="p1_name">Zakiya</span>
    <span id="p1_score">Score: ${score2}</span>`
    const array = data.abilities;

    // Set the initial innerHTML of card1
    card2.innerHTML = `
    <div id="img"><img src="${data.sprites.front_default}" alt="${data.name}"</div>
    <span id="name">${data.name}</span>
    <span id="experience">${data.base_experience}</span>
    <ul id="abilities">Abilities</ul>
`;

    // Reference to the ul element inside card1
    const ul = card2.querySelector('#abilities');


    // Iterate over the abilities array and append li elements to ul
    for (let i = 0; i < array.length; i++) {
        const li = document.createElement('li');
        li.textContent = array[i].ability.name;
        ul.appendChild(li);
    }
    for (let i = 0; i < array.length; i++) {
        const li = document.createElement('li');
        li.textContent = array[i].ability.name;
        ul.appendChild(li);
    }
}
const options = function (data) {
    const valuesArray = Object.entries(data.results);
    //console.log(Array.isArray(valuesArray));
    //console.log(valuesArray);
    const idsArray = valuesArray.map(key => parseInt(key));
    const half = valuesArray.length / 2;
    // console.log(half,total);
    const revisedArray = idsArray.slice(1, half);
    //console.log(revisedArray,"rev");
    return revisedArray;
}
const options2 = function (data) {
    const valuesArray = Object.entries(data.results);
    //console.log(Array.isArray (valuesArray));
    console.log(valuesArray);
    const idsArray = valuesArray.map(key => parseInt(key));
    const half = valuesArray.length / 2;
    const total = valuesArray.length
    const revisedArray = idsArray.slice(half, total);
    console.log(revisedArray);
    //console.log(idsArray.slice()); 

    return revisedArray;
}
async function shuffleIds(data) {
    // Shuffle the array
    for (let i = (data.length) - 1; i >= 1; i--) {
        const j = Math.floor(Math.random() * i + 1);
        [data[i], data[j]] = [data[j], data[i]];
    }

    // Fetch Pokémon data without repeating IDs
    while (data.length > 0) {
        const id = data.pop(); // Remove the last ID from the array
        //console.log(id, "random");
        getPokemon(id);
        //getPlayer2(id);
        //await shuffleIds(data);
        //console.log(data, "pop clearing");
    }

}
async function shuffleIds2(data) {
    // Shuffle the array
    for (let i = (data.length) - 1; i >= 1; i--) {
        const j = Math.floor(Math.random() * i + 1);
        [data[i], data[j]] = [data[j], data[i]];
    }

    // Fetch Pokémon data without repeating IDs
    while (data.length > 0) {
        const id = data.pop(); // Remove the last ID from the array
        // console.log(id, "random");
        // getPokemon(id);
        getPlayer2(id);
        //await shuffleIds(data);
        //console.log(data, "pop clearing");



    }

}

//fight btn functionality
fight.addEventListener('click', () => {
    if (global && global2) {
        const res = exp(global);
        const res2 = exp(global2);
        console.log(global.id + 1);
        if (res > res2) {
            getPokemon(global.id + 1);
            getPlayer2(global2.id + 1);
            score1++;
        } else {
            getPokemon(global.id + 1);
            getPlayer2(global2.id + 1);
            score2++;
        }
        console.log('Base Experience:', res);
        console.log('Base Experience2:', res2);
    } else {
        console.error('Data not loaded yet');
    }

});










