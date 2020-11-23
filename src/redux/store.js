import {applyMiddleware, compose, createStore} from "redux";
import pokemonReducer from "./PokemonReducer";
import thunk from "redux-thunk"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(pokemonReducer, composeEnhancers(applyMiddleware(thunk)))

export default store;