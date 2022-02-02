import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import NameForm from './components/NameForm';
import PokemonsList from './components/PokemonsList';
import ProtectedRoutes from './components/ProtectedRoutes';
import PokemonDetail from './components/PokemonDetail';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>

          <Route path='/' element={<NameForm />} />

          <Route element={<ProtectedRoutes />} >
            <Route path='/pokemons' element={<PokemonsList />} />
            <Route path='/pokemons/:id' element={<PokemonDetail />} />
          </Route>

        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
