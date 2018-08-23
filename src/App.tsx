import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Main from "./Main";

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" render={Main} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
