import { render, screen, within } from "@testing-library/react";
import Controls from "./Controls";

import { Provider } from "react-redux";
import store from "../../store/store";
import { act } from "react-dom/test-utils";

test("renders control block", () => {
  render(
    <Provider store={store}>
      <Controls />
    </Provider>
  );
  const controlTitle = screen.getByText("Controls:");
  expect(controlTitle).toBeInTheDocument();
});

test("clicks init correctly", () => {
  render(
    <Provider store={store}>
      <Controls />
    </Provider>
  );
  const initBtn = screen.getByText("Initialize");
  expect(initBtn).toBeInTheDocument();
  act(() => {
    initBtn.click();
  });
  expect(store.getState().shapes.initiated).toBeTruthy();
});

test("prints to console correctly", () => {
  render(
    <Provider store={store}>
      <Controls />
    </Provider>
  );

  const spy = jest.spyOn(global.console, 'log')

  const initBtn = screen.getByText("Initialize");
  const printBtn = screen.getByText("Print shapes to console");
  expect(initBtn).toBeInTheDocument();
  expect(printBtn).toBeInTheDocument();
  act(() => {
    initBtn.click();
  });
  expect(store.getState().shapes.initiated).toBeTruthy();
  printBtn.click()
  expect(spy).toHaveBeenCalled();
});

// test("switches enable properly", () => {
//     render(
//       <Provider store={store}>
//         <Controls />
//       </Provider>
//     );
//     const initBtn = screen.getByText("Initialize");
//     const backward = screen.getByTestId("motionBackward");
//     expect(initBtn).toBeInTheDocument();
//     expect(backward).toBeInTheDocument();
//     expect(backward).toBeDisabled()
//     act(() => {
//         initBtn.click();
//     });
//     expect(store.getState().shapes.initiated).toBeTruthy();
//     expect(backward).toBeEnabled()
//   });