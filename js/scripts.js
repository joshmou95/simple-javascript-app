
let pokemonList = [
  {name: 'Bulbasaur', height: .7, types: ['grass', 'poison']},
  {name: 'Ivysaur', height: 1, types: ['grass', 'poison']},
  {name: 'Venusaur', height: 2, types: ['grass', 'poison']}
];


for (let i = 0; i < pokemonList.length; i++){
    if (pokemonList[i].height >=2){
      document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ' + ' - Wow, that\'s big!</p>');
  } else {
      document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ' + '</p>');
  }
}