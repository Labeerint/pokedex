import React from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";
import classNames from 'classnames'
import load from '../assets/load.gif'

const PokemonCard = ({name}) =>{
    let [currentPokemon, setCurrentPokemon] = React.useState(null)

    React.useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(({data})=>{
                setCurrentPokemon(data)
            })
    },[name])

    return(
        <Link to={`/pokemon/${name}`}>
            <div className='card'>
                <img className='pokemonImg' src={currentPokemon ? currentPokemon.sprites.front_default : load}/>
                <span>{currentPokemon && currentPokemon.id}</span>
                <h1 className="name">{name}</h1>
                {
                    currentPokemon &&
                        currentPokemon.types.map(types => <span className={classNames(types.type.name, 'type')}
                                                                key={types.type.name}
                        >{types.type.name}</span>)
                }
            </div>
        </Link>
    )
}

export default PokemonCard;