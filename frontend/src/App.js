import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Mexplorer from "./Mexplorer";
import Login from "./Login";
const App = () => {
  return (
  <div className="App">
    <Router>
      <Switch>
        <Route path="/" exact component={Mexplorer}/>
        <Route path="/Login" component={Login}/>
      </Switch>
    </Router>
  </div>
);};

export default App;