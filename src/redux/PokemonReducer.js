import {SET_POKEMON_PAGE_INFO, SET_POKEMONS} from "./constants";

const initialState = {
    pokemons: [],
    currentPokemonsPageInfo: [{name: 'gandon'}],

}


const pokemonReducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_POKEMONS:{
            return {
                ...state,
                pokemons: action.payload
            }
        }
        case SET_POKEMON_PAGE_INFO:{
            console.log('сработал редюсер', action.payload)
            return {
                ...state,
                currentPokemonsPageInfo: action.payload
            }
        }
        default:{
            return state
        }

    }
}

export default pokemonReducer