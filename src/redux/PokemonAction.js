import axios from 'axios'
import {
    CHANGE_DISPLAY_MODE,
    CHANGE_START_POSITION,
    DISPLAY_POKEMONS,
    SEARCH_POKEMONS,
    SET_ALL_POKEMONS_DATA, SET_FILTERS,
    SET_POKEMONS_BY_TYPES
} from "./constants";


export const fetchData = () => dispatch =>{
    let pokemonNames = []
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1050`)
        .then(({data})=>{
            data.results.forEach(pokemon => pokemonNames.push(pokemon.name))
            dispatch(setAllPokemonsData(pokemonNames))
        })
        .then(()=>{
            dispatch(changeStartPosition(0,1))
            dispatch(displayPokemons(0, 10))
        })
}

export const fetchTypes = () => dispatch =>{
    axios.get(`https://pokeapi.co/api/v2/type`)
        .then(({data})=>{
            dispatch(setFilters(data.results))
        })
}

export const fetchPokemonsByTypes =  (types, currentQuantity) => dispatch =>{
    let unique = new Set();
    types.forEach(type =>{
        axios.get(`https://pokeapi.co/api/v2/type/${type}`)
                .then(({data})=>{
                    for(let pok of data.pokemon)
                    {
                        unique.add(pok.pokemon.name)
                    }
                    let uniqueArr = Array.from(unique)
                    dispatch(setPokemonsByTypes(uniqueArr))
                    dispatch(displayPokemons(0, currentQuantity))
                })
    })

}

export const setPokemonsByTypes = (pokemons) =>({
    type: SET_POKEMONS_BY_TYPES,
    payload: pokemons
})

export const setFilters = (filters) =>({
    type: SET_FILTERS,
    payload: filters
})

export const displayPokemons = (startPosition, quantity, type) =>({
    type: DISPLAY_POKEMONS,
    payload: {startPosition, quantity, type}
})

export const setAllPokemonsData = (currentPagePokemons) =>({
    type: SET_ALL_POKEMONS_DATA,
    payload: currentPagePokemons
})

export const searchPokemons = (searchRequest) =>({
    type: SEARCH_POKEMONS,
    payload: searchRequest
})

export const changeDisplayMode = (type) =>({
    type: CHANGE_DISPLAY_MODE,
    payload: type
})

export const changeStartPosition = (startPosition, activePage) =>({
    type: CHANGE_START_POSITION,
    payload: {startPosition, activePage}
})


