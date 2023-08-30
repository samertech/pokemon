import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonList.css'


const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    // Faz a requisição para obter a lista inicial de Pokémons
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(response => {
        const pokemonList = response.data.results;
        // Para cada Pokémon na lista, obtem os detalhes individuais
        Promise.all(pokemonList.map(pokemon => axios.get(pokemon.url)))
          .then(pokemonDetails => {
            setPokemons(pokemonDetails.map(detail => detail.data));
          })
          .catch(error => {
            console.error('Error fetching Pokémon details:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching Pokémon list:', error);
      });
  }, []);

  return (
    <div>
      <h1 className='title'>Pokémon List</h1>
      <ul className='list-list' >
        {pokemons.map(pokemon => (
          <li className='list' key={pokemon.id}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
