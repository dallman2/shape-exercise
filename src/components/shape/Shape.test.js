import { render, screen } from "@testing-library/react";
import Shape from "./Shape";

import { Provider } from "react-redux";
import store from "../../store/store";
import { initShapesStructure } from "../../store/shapes";
import { initShapesMotion } from "../../store/motion";

const shapeData = {
    index: 0,
    name: "Johnson",
    type: "squares",
    size: 7.05,
    color: "#FFBB22",
  }

test("renders shape correctly", () => {
  store.dispatch(initShapesStructure(1));
  store.dispatch(initShapesMotion(1));

  render(
    <Provider store={store}>
      <Shape key={0} data={shapeData} />
    </Provider>
  );

  const shapeInstance = screen.getByText("Johnson")
  expect(shapeInstance).toBeInTheDocument()
  expect(shapeInstance).toHaveClass('Shape')
  expect(shapeInstance).not.toHaveClass('Transparent')

});

test("style for shape applies correctly", () => {
    store.dispatch(initShapesStructure(1));
    store.dispatch(initShapesMotion(1));
  
    render(
      <Provider store={store}>
        <Shape key={0} data={shapeData} />
      </Provider>
    );
  
    const shapeInstance = screen.getByText("Johnson")
    expect(shapeInstance).toBeInTheDocument()
    expect(shapeInstance).toHaveStyle(`background-color: ${shapeData.color}`)
    expect(shapeInstance).toHaveStyle(`height: ${shapeData.size * 2}px`)
  
  });
