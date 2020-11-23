import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios'

const PokemonCard = ({name}) =>{
    let [currentPokemon, setCurrentPokemon] = React.useState(null)

    let dispatch = useDispatch()
    React.useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(({data})=>{
                setCurrentPokemon(data)
            })
    },[])

    return(
        <div className='card'>
            <img src={currentPokemon && currentPokemon.sprites.front_default} alt=""/>
            <h2 className="name">{name}</h2>
            {
                currentPokemon &&
                    currentPokemon.types.map(types => <span key={types.type.name}>{types.type.name}</span>)
            }
        </div>
    )
}

export default PokemonCard;