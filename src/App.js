import { useSelector } from "react-redux";
import "./App.css";

import Controls from "./components/controls";
import Shape from "./components/shape";

function App() {
  const shapes = useSelector((state) => state.shapes);
  let shapeList = shapes.shapes.map((el, idx) => <Shape key={idx} data={el} />);

  return (
    <div className="App">
      <header className="App-header">
        <h2 className="Header-title-text Header-title-padding">
          Shapes Exercise
        </h2>
        <a
          className="Github-link Header-title-padding"
          rel="noreferrer"
          target="_blank"
          href="https://github.com/dallman2/shape-exercise"
        >
          Source
        </a>
      </header>
      <section className="Main-container">
        <div className="Controls-container">
          <Controls />
        </div>
        <div className="Shape-container">{shapeList}</div>
      </section>
    </div>
  );
}

export default App;
