import React, { useState } from 'react';

import PokemonCard from './PokemonCard';

function PokemonList({ data }) {
  const [selectedPokemon, setSelectedPokemon] = useState('Pikachu');
  const [loading, setLoading] = useState(true);
  const [health1, setHealth1] = useState(100);
  const [health2, setHealth2] = useState(100);
  const [comment, setComment] = useState('Fight is about to begin.');
  //form arrays for random pokeomon
  const namesArr = data.map((item) => item.name);
  const imagesArr = data.map((item) => item.image);

  //form random array position for random pokemon
  let raddomPokemonIdx = Math.floor(Math.random() * namesArr.length);

  // Find the selected Pokémon in the data array
  const selectedPokemonData = data.find(
    (pokemon) => pokemon.name.toLowerCase() === selectedPokemon.toLowerCase()
  );

  // Get the image URL (fallback to empty string if not found)
  const selectedPokemonImage = selectedPokemonData?.image || '';

  //get random pokeomon from data object
  const getRandomPokemon = (data) => {
    const randomIndex = Math.floor(Math.random() * data.length);
    //alert(data[randomIndex]);
    return data[randomIndex];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(selectedPokemon);
    battle();
  };

  //this function calculates the battle points of pokemons
  const battle = () => {
    let hp1 = 100;
    let hp2 = 100;

    while (health1 > 0 || health2 > 0) {
      let randomHit1 = Math.floor(Math.random() * 25);

      setComment(
        selectedPokemon + ' attacks with power of ' + randomHit1 + ' points'
      );

      hp1 = hp1 - randomHit1;

      setHealth1(hp1);
      alert(hp1);

      if (hp1 <= 0) {
        hp1 = 0;
        setComment(selectedPokemon + ' wins!!!');
      }

      setTimeout(() => {
        setComment('Waited 1 second!');
      }, 1000);

      let randomHit2 = Math.floor(Math.random() * 25);

      setComment(
        namesArr[raddomPokemonIdx] +
          ' attacks with power of ' +
          randomHit2 +
          ' points'
      );

      hp2 = hp2 - randomHit2;

      setHealth2(hp2);

      if (health2 <= 0) {
        health2 = 0;
        setComment(namesArr[raddomPokemonIdx] + ' wins!!!');
      }

      setTimeout(() => {
        setComment('Waited 1 second!');
      }, 1000);
    } //end of while loop
  };

  return (
    <>
      <div className="pokemons-list">
        <h2>Select Your Pokemon</h2>
        <form>
          <select
            className="pokemons"
            onChange={(e) => {
              setSelectedPokemon(e.target.options[e.target.selectedIndex].text);
            }}
          >
            <option value="pikachu">Pikachu</option>
            <option value="bulbasaur">Bulbasaur</option>
            <option value="charmander">Charmander</option>
          </select>
          <button
            type="submit"
            className="submit-button"
            onClick={handleSubmit}
          >
            Select
          </button>
        </form>

        <p className="selected-pokemon">
          You selected pokemon: {selectedPokemon}
        </p>
        <p className="selected-pokemon">
          You random pokemon: {namesArr[raddomPokemonIdx]}
        </p>
      </div>

      {loading && (
        <div className="pokemon-field">
          <div className="pokemon-fight">
            <PokemonCard name={selectedPokemon} image={selectedPokemonImage} />
            <img
              alt="vs battle image"
              src="https://as1.ftcdn.net/jpg/02/97/19/88/1000_F_297198830_S54w7aKIcUNpL1DNto47SJUc7A9SDh9W.jpg"
            />
            <PokemonCard
              name={namesArr[raddomPokemonIdx]}
              image={imagesArr[raddomPokemonIdx]}
            />
          </div>
          <div className="pokemon-comments">
            <p className="pokemon-comment">{health1}</p>
            <p className="pokemon-comment">{comment}</p>
            <p className="pokemon-comment">{health2}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default PokemonList;
