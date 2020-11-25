import React from "react";
import Wrapper from "./components/Wrapper";
import {Route} from "react-router-dom";
import PokemonPage from "./components/PokemonPage";

function App() {
    return(
        <div>
            <Route exact path='/' component={Wrapper}/>
            <Route path='/pokemon/:name' component={PokemonPage} />
        </div>
    )
}

export default App;
