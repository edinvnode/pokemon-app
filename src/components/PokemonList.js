import React, { useState } from 'react';

function PokemonList() {
  const [selectedPokemon, setSelectedPokemon] = useState('pikachu');

  const handleSelect = () => {};

  return (
    <div className="pokemons-list">
      <h2>Select Your Pokemon</h2>
      <form>
        <select
          className="pokemons"
          onChange={(e) => {
            setSelectedPokemon(e.target.options[e.target.selectedIndex].text);
            console.log(e.target);
          }}
        >
          <option value="pikachu">Pikachu</option>
          <option value="bulbasaur">Bulbasaur</option>
          <option value="charmander">Charmander</option>
        </select>
        <button type="submit" className="submit-button">
          Select
        </button>
      </form>

      <p>You selected pokemon: {selectedPokemon}</p>
    </div>
  );
}

export default PokemonList;
