import React, { useState, useEffect } from 'react';

import PokemonCard from './PokemonCard';

function PokemonList({ data }) {
  const [selectedPokemon, setSelectedPokemon] = useState('Pikachu');
  const [loading, setLoading] = useState(false);
  const [restartBattle, setRestartBattle] = useState(false);
  const [health1, setHealth1] = useState(100);
  const [health2, setHealth2] = useState(100);
  const [comment, setComment] = useState('Fight is about to begin.');

  //form arrays for random pokeomon
  const namesArr = data.map((item) => item.name);
  const imagesArr = data.map((item) => item.image);

  const [randomPokemonIdx, setRandomPokemonIdx] = useState(
    Math.floor(Math.random() * namesArr.length)
  );

  // Find the selected Pokémon in the data array
  const selectedPokemonData = data.find(
    (pokemon) => pokemon.name.toLowerCase() === selectedPokemon.toLowerCase()
  );

  // Get the image URL (fallback to empty string if not found)
  const selectedPokemonImage = selectedPokemonData?.image || '';

  useEffect(() => {
    if (loading) {
      battle();
    }
  }, [randomPokemonIdx]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Generate a new random index and update state
    const newIdx = Math.floor(Math.random() * namesArr.length);
    setRandomPokemonIdx(newIdx);
    //setRestartBattle(true);
  };

  const handleRestart = () => {
    setLoading(false);
    setRestartBattle(false);
    setSelectedPokemon('');
  };

  //this function calculates the battle points of pokemons
  const battle = () => {
    let hp1 = 100;
    let hp2 = 100;

    const fightTurn = () => {
      if (hp1 <= 0 || hp2 <= 0) {
        return; // Stop battle if a Pokémon has fainted
      }

      let randomHit1 = Math.floor(Math.random() * 25);
      let randomHit2 = Math.floor(Math.random() * 25);

      // Calculate new health values
      hp1 = Math.max(hp1 - randomHit1, 0);
      hp2 = Math.max(hp2 - randomHit2, 0);

      // Update state with new health values
      setHealth1(hp1);
      setHealth2(hp2);

      // Announce first attack
      setComment(`${selectedPokemon} attacks with power of ${randomHit1}!`);

      setTimeout(() => {
        if (hp2 <= 0) {
          setComment(`${selectedPokemon} wins!!!`);
          setRestartBattle(true);
          return; // Stop further execution
        }

        // Announce second attack
        setComment(
          `${namesArr[randomPokemonIdx]} attacks with power of ${randomHit2}!`
        );

        setTimeout(() => {
          if (hp1 <= 0) {
            setComment(`${namesArr[randomPokemonIdx]} wins!!!`);
            setRestartBattle(true);
            return; // Stop further execution
          }

          fightTurn(); // Continue battle if both Pokémon still have HP
        }, 1000);
      }, 1000);
    };

    fightTurn();
  };

  return (
    <>
      <div className="pokemons-list">
        <h2>Select Your Pokemon</h2>
        <form>
          <select
            className="pokemons"
            value={selectedPokemon}
            onChange={(e) => {
              const newSelection = e.target.value;
              setSelectedPokemon(''); // Reset first
              setTimeout(() => setSelectedPokemon(newSelection), 0); // Then update
            }}
          >
            {data.map((pokemon) => (
              <option key={pokemon.name} value={pokemon.name}>
                {pokemon.name}
              </option>
            ))}
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
          {selectedPokemon
            ? `You selected pokemon: ${selectedPokemon}`
            : 'Please select your pokemon'}
        </p>
        <p className="selected-pokemon">
          You random pokemon: {namesArr[randomPokemonIdx]}
        </p>
      </div>
      {restartBattle && (
        <div className="restart-battle">
          <button className="restart-button" onClick={handleRestart}>
            Restart Battle
          </button>
        </div>
      )}
      {loading && (
        <div className="pokemon-field">
          <div className="pokemon-fight">
            <PokemonCard name={selectedPokemon} image={selectedPokemonImage} />
            <img
              alt="vs battle image"
              src="https://as1.ftcdn.net/jpg/02/97/19/88/1000_F_297198830_S54w7aKIcUNpL1DNto47SJUc7A9SDh9W.jpg"
            />
            <PokemonCard
              name={namesArr[randomPokemonIdx]}
              image={imagesArr[randomPokemonIdx]}
            />
          </div>

          <div className="pokemon-comments">
            <p className="pokemon-comment">
              {`${selectedPokemon} hit points ${health1}`}
            </p>
            <p className="pokemon-comment">{comment}</p>
            <p className="pokemon-comment">
              {`${namesArr[randomPokemonIdx]} hit points ${health2}`}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default PokemonList;
