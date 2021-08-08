import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Main from "./components/Main";
import NewPost from "./components/NewPost";
import SelectedPost from "./components/SelectedPost";


function App() {
  return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/new" component={NewPost} />
            <Route path="/posts/:id" component={SelectedPost} />
            <Route path="*" exact component={Main} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
