import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
    const [pokemonName, setPokemonName] = useState("")
    const [pokemonData, setPokemonData] = useState({
          name: "", 
          species: "", 
          img: "", 
          hp: "",
          attack: "",
          defense: "",
          type: "",
          weight: "",
          height: "",
          ability: "",
    })
    const [pokemonSelected, setPokemonSelected] = useState(false)

    const searchPokemon = () => {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => {
        console.log(res);
        setPokemonData({
          name: pokemonName, 
          species: res.data.species.name, 
          img: res.data.sprites.front_default, 
          hp: res.data.stats[0].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
          type: res.data.types[0].type.name,
          weight: res.data.weight,
          height: res.data.height,
          ability: res.data.abilities[0].ability.name,
        })
        setPokemonSelected(true)
      })
      .catch(err => console.log(err));
    }

    return (
      <>
        <div className='App'>
          <div className='Header'>
            <h1>Hi Pokemon Picker, discover your Pokemon here!</h1>
            <input type='text' onChange={(e) => {setPokemonName(e.target.value)}}/>
            <button onClick={searchPokemon}>Search Pokemon</button>
          </div>
          <div className='DataShowSection'>
            {!pokemonSelected? (<h1>Find your favourite Pokemon</h1>) : (
              <>
                <h1>{pokemonData.name }</h1>
                <img src={pokemonData.img} width="200" height="200"/>
                <h5>Ability: {pokemonData.ability}</h5>
                <h5>Weight: {pokemonData.weight}</h5>
                <h5>Height: {pokemonData.height}</h5>
                <h5>Type: {pokemonData.type}</h5>
                <h5>HP: {pokemonData.hp}</h5>
                <h5>Attack: {pokemonData.attack}</h5>
                <h5>Defense: {pokemonData.defense}</h5>
              </>
              )}
          </div>
        </div>
      </>
    )
}

export default App
