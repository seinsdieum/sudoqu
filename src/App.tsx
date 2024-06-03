import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Game from "./components/Game/Game";
import {Provider} from "react-redux";
import {store} from "./store/actual";
import About from "./components/About/About";
import {loadGames} from "./store/controllers/games";
import History from "./components/History/History";
import NotFound from "./components/NotFound/NotFound";

function App() {

  loadGames()


  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={'*'} element={<NotFound/>}/>
          <Route path={'/sudoqu'} element={<Layout/>}>
            <Route path={'*'} element={<NotFound/>}/>
            <Route index element={<Navigate to={'game'}/>}></Route>
            <Route path={'game'} >
              <Route index element={<Game/>}/>
            </Route>
            <Route path={'settings'}>

            </Route>
            <Route path={'history'} element={<History/>}>

            </Route>
            <Route path={'about'} element={<About/>}>

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
