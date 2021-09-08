import Agent from "./components/agent/Agent";
import Home from "./components/home/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/agent" component={Agent} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
