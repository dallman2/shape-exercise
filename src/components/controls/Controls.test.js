import { render, screen } from "@testing-library/react";
import Controls from "./Controls";

import { Provider } from "react-redux";
import store from "../../store/store";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

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

  const spy = jest.spyOn(global.console, "log");

  const initBtn = screen.getByText("Initialize");
  const printBtn = screen.getByText("Print shapes to console");
  expect(initBtn).toBeInTheDocument();
  expect(printBtn).toBeInTheDocument();
  act(() => {
    initBtn.click();
  });
  expect(store.getState().shapes.initiated).toBeTruthy();
  printBtn.click();
  expect(spy).toHaveBeenCalled();
});

test("switches trigger and stop motion", () => {
  render(
    <Provider store={store}>
      <Controls />
    </Provider>
  );
  const initBtn = screen.getByText("Initialize");
  const forward = screen.getByTestId("motionForward");
  const backward = screen.getByTestId("motionBackward");
  expect(initBtn).toBeInTheDocument();
  expect(backward).toBeInTheDocument();
  expect(forward).toBeInTheDocument();

  userEvent.click(initBtn);
  expect(store.getState().shapes.initiated).toBeTruthy();

  userEvent.click(backward);
  expect(store.getState().motion.backward).toBeTruthy();
  userEvent.click(backward);
  expect(store.getState().motion.backward).toBeFalsy();
  userEvent.click(forward);
  expect(store.getState().motion.forward).toBeTruthy();
  userEvent.click(forward);
  expect(store.getState().motion.forward).toBeFalsy();

  userEvent.click(forward);
  expect(store.getState().motion.forward).toBeTruthy();
  userEvent.click(backward);
  expect(store.getState().motion.forward).toBeFalsy();
  expect(store.getState().motion.backward).toBeTruthy();
  userEvent.click(backward);
  expect(store.getState().motion.backward).toBeFalsy();

});
