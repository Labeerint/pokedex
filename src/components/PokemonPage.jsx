import React from 'react'
import axios from "axios";
import {Link} from "react-router-dom";



const PokemonPage = ({match}) =>{
    let [currentPokemon, setCurrentPokemon] = React.useState(null)
    const name = match.params.name
    React.useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(({data})=>{
                setCurrentPokemon(data)
            })
    },[name])

    return(
        <div>
            <div className="header">
                <Link to='/'>
                    <h1 className="title">POKEDEX</h1>
                </Link>
            </div>
            <div className='pokemonPage'>
                <img src={currentPokemon && currentPokemon.sprites.front_default} alt=""/>
                <h1 className="name">{name}</h1>
                <h2>Height: {currentPokemon && currentPokemon.height}</h2>
                <h2>Weight: {currentPokemon && currentPokemon.weight}</h2>
                <h2>Types:</h2>
                {
                    currentPokemon &&
                    currentPokemon.types.map(types => <span key={types.type.name}>{types.type.name}</span>)
                }
                <h2>Stats:</h2>
                {
                    currentPokemon &&
                        currentPokemon.stats.map(statItem => <div key={statItem.stat.name} className='stat'>
                            <span >{statItem.stat.name}: </span>
                            <span >{statItem.base_stat}</span>
                        </div>)
                }
            </div>
        </div>

    )
}

export default PokemonPage