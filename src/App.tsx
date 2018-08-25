import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Main from "./Main";
// import WrappedDynamicFieldSet from './transporter/AddTransporterForm';
class App extends React.Component {
  public render() {
    return (
      // <div>
      //   <WrappedDynamicFieldSet />
      // </div>
      <BrowserRouter>
        <div>
          <Route path="/" render={Main} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
