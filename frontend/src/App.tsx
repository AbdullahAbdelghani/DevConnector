import "./App.css";
import { GlobalStateConfig } from "./config/GlobalStateConfig";
import { RouterConfig } from "./config/router";

const App = () => (
  <GlobalStateConfig>
    <RouterConfig />
  </GlobalStateConfig>
);

export default App;
