import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import HomePage from './components/HomePage'
import About from './components/About'
import StateRoute from './components/StateRoute'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/about" component={About} />
      <Route exact path="/state/:stateCode" component={StateRoute} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
