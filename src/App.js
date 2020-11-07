import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Index from './components/Index';
import Header from './components/Header';
import Register from './auth/Register';
import Login from './auth/Login';
import UserMasks from './masks/UserMasks';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Index}></Route>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/usermasks" component={UserMasks} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
