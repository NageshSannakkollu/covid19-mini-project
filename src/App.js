import {BrowserRouter, Switch, Route} from 'react-router-dom'
import HomePage from './components/HomePage'
import StateRoute from './components/StateRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/state/:stateCode" component={StateRoute} />
    </Switch>
  </BrowserRouter>
)

export default App
