import "./App.css";

import Switch from 'react-switch'
import Shape from "./components/shape";


function App() {
  let forward = false

  const forwardChanged = () => {
    console.log('clicked the forward btn')

  }

  return (
    <div className="App">
      <header className="App-header">
        <h2 className="Header-title-text Header-title-padding">
          Shapes Excersize
        </h2>
      </header>
      <section>
        <div>
          <p>I hold the controls</p>
          <Switch onChange={forwardChanged} checked={forward}/>
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
