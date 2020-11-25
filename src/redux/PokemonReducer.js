import {
    CHANGE_DISPLAY_MODE,
    CHANGE_START_POSITION,
    DISPLAY_POKEMONS,
    SEARCH_POKEMONS,
    SET_ALL_POKEMONS_DATA, SET_FILTERS,
    SET_POKEMONS_BY_TYPES
} from "./constants";

const initialState = {
    pokemons: [],
    allPokemonsData: [],
    afterSearchData: [],
    displayMode: 'normal',
    startPosition: 0,
    filters: [],
    filtersData: [],
    numberOfPages: 0,
    activePage: 1
}



const pokemonReducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_ALL_POKEMONS_DATA:{
            return {
                ...state,
                allPokemonsData: action.payload
            }
        }
        case SEARCH_POKEMONS:{
            let filtration = state.allPokemonsData.filter((pokemon)=>pokemon.includes(action.payload))
            return {
                ...state,
                afterSearchData: filtration
            }
        }
        case DISPLAY_POKEMONS:{
            const startPosition = action.payload.startPosition
            const quantity = action.payload.quantity
            let pokemons;
            let currentPage = []
            switch (state.displayMode) {
                case 'search':
                    pokemons = state.afterSearchData
                    break
                case 'filters':
                    pokemons = state.filtersData
                    break
                default:
                    pokemons = state.allPokemonsData
            }

            for(let i = 0; i <quantity; ++i){
                if(pokemons[startPosition+i]) {
                    currentPage.push(pokemons[startPosition + i])
                }
            }

            return{
                ...state,
                pokemons: currentPage,
                numberOfPages: Math.ceil(pokemons.length/quantity),
                activePage: 1+ Math.ceil(startPosition/quantity)
            }
        }
        case CHANGE_DISPLAY_MODE:{
            return {
                ...state,
                startPosition: 0,
                activePage: 1,
                displayMode: action.payload
            }
        }
        case CHANGE_START_POSITION:{
            return {
                ...state,
                startPosition: action.payload.startPosition,
                activePage: action.payload.activePage
            }
        }
        case SET_FILTERS:{
            return {
                ...state,
                filters: action.payload

            }
        }
        case SET_POKEMONS_BY_TYPES:{
            return {
                ...state,
                filtersData: action.payload
            }
        }
        default:{
            return state
        }

    }
}

export default pokemonReducer