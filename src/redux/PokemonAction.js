import axios from 'axios'
import {
    CHANGE_DISPLAY_MODE,
    CHANGE_START_POSITION,
    DISPLAY_POKEMONS,
    SEARCH_POKEMONS,
    SET_ALL_POKEMONS_DATA, SET_FILTERS,
    SET_POKEMONS, SET_POKEMONS_BY_TYPES
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

    console.log(types)
    types.forEach(type =>{
        axios.get(`https://pokeapi.co/api/v2/type/${type}`)
                .then(({data})=>{
                    // console.log('type:', type)
                    for(let pok of data.pokemon)
                    {
                        unique.add(pok.pokemon.name)
                    }
                    // console.log('отфильтрованные покесоны в экшене', unique)
                    let uniqueArr = Array.from(unique)
                    // console.log('uniqueArr',uniqueArr)
                    dispatch(setPokemonsByTypes(uniqueArr))
                    dispatch(changeDisplayMode('filters'))
                    dispatch(displayPokemons(0, currentQuantity))
                })
    })
    // for(let i=0;i<types.length;++i){
    //
    // }

    // let uniqueArr = Array.from(unique)
    // console.log('uniqueArr',uniqueArr)
    // dispatch(setPokemonsByTypes(uniqueArr))
    // dispatch(changeDisplayMode('filters'))
    // dispatch(displayPokemons(0,10))

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

export const changeStartPosition = (startPosition, activePage) =>({
    type: CHANGE_START_POSITION,
    payload: {startPosition, activePage}
})


