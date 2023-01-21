import "./App.css";

import Controls from './components/controls'
import Shape from "./components/shape";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2 className="Header-title-text Header-title-padding">
          Shapes Exercise
        </h2>
      </header>
      <section>
        <div className="Controls-container">
          <Controls/>
        </div>
        <div className="Scaler Shape-container">
          <p>I am the container of shapes</p>
          <p>I need to be scaled</p>
          <Shape />
        </div>
      </section>
    </div>
  );
}

export default App;
