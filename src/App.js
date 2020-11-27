import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Index from './components/Index';
import Header from './components/Header';
import Register from './auth/Register';
import Login from './auth/Login';
import UserMasks from './masks/UserMasks';
import AddMask from './masks/AddMask';
import EditMask from './masks/EditMask';
import UserMaskDetails from './masks/UserMaskDetails';

const history = createBrowserHistory();

const App = () => {
  return (
    <div className="App">
      <Router history={history}>
        <Header />
        <main>
          <Switch>
            <Route exact path="/usermasks" component={UserMasks} />
            <Route exact path="/addmask" component={AddMask} />
            <Route exact path="/usermaskdetails" component={UserMaskDetails} />
            <Route exact path="/editmask" component={EditMask} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Index}></Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;
