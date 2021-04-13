/* eslint-disable no-param-reassign */
// get pokemon api from server
const pokemonRepository = (() => {
  const pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=100';

  // Add new pokemon if needed
  function add(pokemon) {
    if (
      typeof pokemon === 'object'
      && 'name' in pokemon
      && 'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      // eslint-disable-next-line no-alert
      alert('pokemon is not correct');
    }
  }

  // returns list of pokemon from json object
  function getAll() {
    return pokemonList;
  }

  // loads details from API url
  async function loadDetails(pokemon) {
    const url = pokemon.detailsUrl;
    // fetch data from detailsUrl
    const response = await fetch(url);
    try {
      const details = await response.json();
      // Now we add image, height, and type
      pokemon.imageUrl = details.sprites.other.dream_world.front_default;
      pokemon.height = details.height;
      pokemon.type = [];
      for (let i = 0; i < details.types.length; i += 1) {
        pokemon.type.push(` ${details.types[i].type.name}`);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  // uses bootstrap modal classes, selects body and title
  async function showDetails(pokemon) {
    const modalBody = document.querySelector('.modal-body');
    const modalTitle = document.querySelector('.modal-title');

    // Clear all existing modal content from body and title
    modalTitle.innerHTML = '';
    modalBody.innerHTML = '';

    // loads details into created header and paragraphs
    await loadDetails(pokemon);
    const titleElement = document.createElement('h3');
    titleElement.innerText = pokemon.name;

    const contentElement = document.createElement('p');
    contentElement.innerText = `Height: ${pokemon.height}`;

    const typeElement = document.createElement('p');
    typeElement.innerText = `Types: ${pokemon.type}`;

    const myImage = document.createElement('img');
    myImage.classList.add('pokemon-image');
    myImage.src = pokemon.imageUrl;

    // appends created elements to modal body and title
    modalTitle.appendChild(titleElement);
    modalBody.appendChild(contentElement);
    modalBody.appendChild(typeElement);
    modalBody.appendChild(myImage);
  }

  function addListItem(pokemon) {
    // creates li and button elements within the ul
    const pokemonName = document.querySelector('.list-group');
    const listItem = document.createElement('li');
    const button = document.createElement('button');
    // returns text content of pokemonName name
    button.innerText = pokemon.name;
    // creates button to trigger bootstrap modal
    button.classList.add('btn', 'btn-primary');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal-container');
    listItem.classList.add('group-list-item');
    listItem.appendChild(button);
    pokemonName.appendChild(listItem);
    // prints array data of button clicked to console
    button.addEventListener('click', () => { showDetails(pokemon); });
  }

  // fetches data from API url json
  async function loadList() {
    try {
      const response = await fetch(apiUrl);
      const json = await response.json();
      json.results.forEach((item) => {
        const pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }

  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,
    showDetails,
  };
})();

// load data from API
pokemonRepository.loadList().then(() => {
  // returns list of pokemon from API
  pokemonRepository.getAll().forEach((pokemon) => {
    // creates list of pokemon on index.html
    pokemonRepository.addListItem(pokemon);
  });
});
