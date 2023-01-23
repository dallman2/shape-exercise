import { render, screen } from "@testing-library/react";
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
