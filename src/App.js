import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Register from './auth/Register';
import Login from './auth/Login';

function App() {
  return (
    <div className="App">
      <header className="App-header">Mask Tracker</header>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
