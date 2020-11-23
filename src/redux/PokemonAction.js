import axios from 'axios'
import {SET_POKEMON_PAGE_INFO, SET_POKEMONS} from "./constants";


export const fetchPokemons = (limit) => dispatch => {
    console.log('limit', limit)
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=20`)                  // получаем массив данных с именами покемонов
        .then(({data})=>{
            dispatch(setPokemons(data.results))                                 // засовываем их в стейт
            return data
        })
}

export const fetchPakemonsPageInfo = (pokemons) => dispatch => {
    let currentPagePokemons = []                                        // массив для данных о покемонах
    for(const pokemon of pokemons){                                     // получаем обьект данных о каждом покемоне
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            .then(({data})=>{
                currentPagePokemons.push(data)                          // засовываем его в массив
            })
    }
    dispatch(setPokemonsPageInfo(currentPagePokemons))
}

export const setPokemons = (pokemons) =>({
    type: SET_POKEMONS,
    payload: pokemons
})

export const setPokemonsPageInfo = (currentPagePokemons) =>({
    type: SET_POKEMON_PAGE_INFO,
    payload: currentPagePokemons
})


