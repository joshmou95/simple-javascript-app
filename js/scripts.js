let pokemonRepository = (function () {
  let pokemonList = [
    {name: 'Bulbasaur', height: .7, types: ['grass', 'poison']},
    {name: 'Ivysaur', height: 1, types: ['grass', 'poison']},
    {name: 'Venusaur', height: 2, types: ['grass', 'poison']},
    {name: 'Charmander', height: .6, types: ['fire']},
    {name: 'Charmeleon', height: 1.1, types: ['fire']},
    {name: 'Charizard', height: 1.7, types: ['fire', 'flying']}
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  return {
    getAll: getAll,
    add: add
  };
})();

pokemonRepository.getAll().forEach(function(pokemon){
  let name = (pokemon.name + ': ');
  let height = (' (Height: ' + pokemon.height + ') ');
    if (pokemon.height >= 1.5){
      document.write('<p>' + name + height + ' - Wow, that\'s big!</p>');
  } else {
      document.write('<p>' + name + height + '</p>');
  }
})

