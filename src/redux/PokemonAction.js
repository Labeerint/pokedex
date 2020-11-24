import axios from 'axios'
import {
    CHANGE_DISPLAY_MODE,
    CHANGE_START_POSITION,
    DISPLAY_POKEMONS,
    SEARCH_POKEMONS,
    SET_ALL_POKEMONS_DATA,
    SET_POKEMONS
} from "./constants";


// export const fetchPokemons = (limit, page) => dispatch => {
//     console.log('limit', limit)
//     console.log('page', page)
//     axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${page}`)                  // получаем массив данных с именами покемонов
//         .then(({data})=>{
//             dispatch(setPokemons(data.results))                                 // засовываем их в стейт
//             return data
//         })
// }

export const fetchData = () => dispatch =>{
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1050`)
        .then(({data})=>{
            dispatch(setAllPokemonsData(data.results))
        })
        .then(()=>{
            dispatch(changeStartPosition(0))
            dispatch(displayPokemons(0, 10))
        })
}

export const displayPokemons = (startPosition, quantity, type) =>({
    type: DISPLAY_POKEMONS,
    payload: {startPosition, quantity, type}
})

export const setPokemons = (pokemons) =>({
    type: SET_POKEMONS,
    payload: pokemons
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

export const changeStartPosition = (startPosition) =>({
    type: CHANGE_START_POSITION,
    payload: startPosition
})


