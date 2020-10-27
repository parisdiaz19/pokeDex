const pokeContainer = document.getElementById('poke-container');
const pokemon_number = 150;
const colors = {
    fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const mainTypes = Object.keys(colors);


const fetchPokemon = async () => {
    for (let i = 1; i <= pokemon_number; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch (url);
    const pokemon = await res.json();
    console.log(pokemon);
    createPokemonCard(pokemon);
}



function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const pokeTypes = pokemon.types.map(el => el.type.name);
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];

    const pokeInnerHTML = `    
            <div class="col s4">
            <div class="card" style='background-color: ${color};'>
                <div class="card-image waves-effectg waves-block waves-light">
                <img class="activator" src="${pokemon.sprites.front_default}">
                </div> 
                <div class="card-content center-align">
                    <h6 class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</h6>
                    <h5>${name}</h5>
                    <p>Type: ${type.charAt(0).toUpperCase() + type.slice(1)}</p>
                    <p> Weight: ${pokemon.weight} lbs</p>
                </div>
            </div>
            </div>
    `;

    pokemonEl.innerHTML = pokeInnerHTML;
    pokeContainer.appendChild(pokemonEl);
}

fetchPokemon();